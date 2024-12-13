import bcrypt from 'bcrypt';
import Cors from 'cors';
import connectToDatabase from '../config/db';
import User from '../models/User';
import cloudinary from '../config/cloudinary';
import multer from 'multer';

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
    const profilePhoto = await cloudinary.v2.uploader.upload_stream(
      { folder: 'profile_photos' },
      (error, result) => {
        if (error) throw new Error('Error al subir la foto de perfil a Cloudinary');
        return result.secure_url;
      }
    );
    profilePhotoFile.stream.pipe(profilePhoto);

    const frontDni = await cloudinary.v2.uploader.upload_stream(
      { folder: 'dni_photos' },
      (error, result) => {
        if (error) throw new Error('Error al subir la foto frontal del DNI a Cloudinary');
        return result.secure_url;
      }
    );
    frontDniFile.stream.pipe(frontDni);

    const backDni = await cloudinary.v2.uploader.upload_stream(
      { folder: 'dni_photos' },
      (error, result) => {
        if (error) throw new Error('Error al subir la foto trasera del DNI a Cloudinary');
        return result.secure_url;
      }
    );
    backDniFile.stream.pipe(backDni);

    let certificates = null;
    if (userType === 'Cuidador' && certificatesFile) {
      certificates = await cloudinary.v2.uploader.upload_stream(
        { folder: 'certificates' },
        (error, result) => {
          if (error) throw new Error('Error al subir los certificados a Cloudinary');
          return result.secure_url;
        }
      );
      certificatesFile.stream.pipe(certificates);
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
