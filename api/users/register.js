import bcrypt from 'bcrypt';
import Cors from 'cors';
import connectToDatabase from '../config/db';
import User from '../models/User';
import cloudinary from 'cloudinary';
import multer from 'multer';
import { promisify } from 'util';

// Configuración de CORS
const cors = Cors({
  methods: ['POST'], // Solo permite métodos POST
  origin: '*',
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Configuración de multer para manejar archivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Promisificar la función de Cloudinary para que se puedan usar promesas
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    ).end(fileBuffer);
  });
};

export default async function handler(req, res) {
  try {
    console.log('Iniciando la función /api/users/register');

    // Ejecutar middleware de CORS
    await runMiddleware(req, res, cors);
    console.log('CORS ejecutado correctamente');

    // Validar método HTTP
    if (req.method !== 'POST') {
      console.log('Método HTTP no permitido');
      return res.status(405).json({ message: 'Método no permitido' });
    }

    // Usar multer para procesar la subida de archivos
    await new Promise((resolve, reject) => {
      upload.fields([
        { name: 'profilePhoto', maxCount: 1 },
        { name: 'frontDni', maxCount: 1 },
        { name: 'backDni', maxCount: 1 },
        { name: 'certificates', maxCount: 1 }
      ])(req, res, (err) => {
        if (err) {
          console.error('Error subiendo archivos con multer:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });

    // Extraer datos del cuerpo de la solicitud
    const { name, email, password, userType, country } = req.body;
    const profilePhotoFile = req.files['profilePhoto']?.[0];
    const frontDniFile = req.files['frontDni']?.[0];
    const backDniFile = req.files['backDni']?.[0];
    const certificatesFile = req.files['certificates']?.[0];

    console.log('Datos recibidos:', { name, email, userType, country });

    // Validar campos obligatorios
    if (!name || !email || !password || !userType || !country || !profilePhotoFile || !frontDniFile || !backDniFile) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    // Si el usuario es cuidador, validar que haya subido certificados
    if (userType === 'Cuidador' && !certificatesFile) {
      return res.status(400).json({ message: 'Los cuidadores deben subir certificados' });
    }

    // Conectar a la base de datos
    await connectToDatabase();

    // Verificar si el correo ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Subir imágenes a Cloudinary
    const profilePhoto = await uploadToCloudinary(profilePhotoFile.buffer, 'profile_photos');
    const frontDni = await uploadToCloudinary(frontDniFile.buffer, 'dni_photos');
    const backDni = await uploadToCloudinary(backDniFile.buffer, 'dni_photos');

    let certificates = null;
    if (userType === 'Cuidador' && certificatesFile) {
      certificates = await uploadToCloudinary(certificatesFile.buffer, 'certificates');
    }

    // Crear un nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userType,
      country,
      profilePhoto,
      frontDni,
      backDni,
      certificates
    });

    // Guardar el usuario en la base de datos
    await newUser.save();
    console.log('Usuario registrado con éxito');

    // Responder con éxito
    res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
  } catch (error) {
    console.error('Error inesperado en el servidor:', error.message);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
}
