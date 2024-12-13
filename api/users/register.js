import bcrypt from 'bcrypt';
import Cors from 'cors';
import connectToDatabase from '../config/db';
import User from '../models/User';
import multer from 'multer';
import fetch from 'node-fetch';

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
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5 MB por archivo
});

export const config = {
  api: {
    bodyParser: false, // Deshabilitar bodyParser para que multer lo maneje
  },
};

const uploadFilesMiddleware = upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'frontDni', maxCount: 1 },
  { name: 'backDni', maxCount: 1 },
  { name: 'certificates', maxCount: 1 },
]);

const uploadToCloudinary = async (fileBuffer) => {
  const formData = new FormData();
  formData.append('file', fileBuffer);
  formData.append('upload_preset', 'ml_default'); // Cambia por tu preset en Cloudinary

  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dp6iwjckt/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);
    return data.secure_url;
  } catch (error) {
    console.error('Error al subir a Cloudinary:', error);
    throw new Error('Error al subir las imágenes a Cloudinary');
  }
};

export default async function handler(req, res) {
  try {
    console.log('Iniciando la función /api/users/register');

    // Ejecutar middleware de CORS
    await runMiddleware(req, res, cors);
    console.log('CORS ejecutado correctamente');

    // Validar método HTTP
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Método no permitido' });
    }

    // Usar multer para procesar la subida de archivos
    await new Promise((resolve, reject) => {
      uploadFilesMiddleware(req, res, (err) => {
        if (err) {
          console.error('Error subiendo archivos con multer:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });

    // Revisar qué datos llegan
    console.log('Archivos recibidos:', req.files);
    console.log('Datos del cuerpo:', req.body);

    // Extraer datos
    const { name, email, password, userType, country } = req.body || {};
    const profilePhotoFile = req.files?.profilePhoto?.[0];
    const frontDniFile = req.files?.frontDni?.[0];
    const backDniFile = req.files?.backDni?.[0];
    const certificatesFile = req.files?.certificates?.[0];

    // Validar campos obligatorios
    if (
      !name ||
      !email ||
      !password ||
      !userType ||
      !country ||
      !profilePhotoFile ||
      !frontDniFile ||
      !backDniFile
    ) {
      console.log('Error: Campos obligatorios faltantes');
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    // Si el usuario es cuidador, validar que haya subido certificados
    if (userType === 'Cuidador' && !certificatesFile) {
      console.log('Error: Certificados faltantes para cuidadores');
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
    const profilePhoto = await uploadToCloudinary(profilePhotoFile.buffer);
    const frontDni = await uploadToCloudinary(frontDniFile.buffer);
    const backDni = await uploadToCloudinary(backDniFile.buffer);

    let certificates = null;
    if (userType === 'Cuidador' && certificatesFile) {
      certificates = await uploadToCloudinary(certificatesFile.buffer);
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
      certificates,
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
