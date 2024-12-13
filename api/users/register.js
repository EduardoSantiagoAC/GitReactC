import bcrypt from 'bcrypt';
import Cors from 'cors';
import connectToDatabase from '../config/db';
import User from '../models/User';
import multer from 'multer';
import nextConnect from 'next-connect';

// Configuración de multer para manejar `multipart/form-data`
const upload = multer({ storage: multer.memoryStorage() });

// Configuración de CORS
const cors = Cors({
  methods: ['POST'], // Solo permite métodos POST
  origin: '*',
});

// Middleware para manejar CORS
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

// Configuración de nextConnect para usar multer
const handler = nextConnect();
handler.use(upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'frontDni', maxCount: 1 },
  { name: 'backDni', maxCount: 1 },
  { name: 'certificates', maxCount: 1 }, // Solo para cuidadores
]));

// Endpoint de registro
handler.post(async (req, res) => {
  try {
    console.log('Iniciando el registro de usuario');

    // Ejecutar middleware de CORS
    await runMiddleware(req, res, cors);
    console.log('CORS ejecutado correctamente');

    // Extraer datos del formulario
    const { name, email, password, userType, country } = req.body;
    const profilePhoto = req.files['profilePhoto']?.[0];
    const frontDni = req.files['frontDni']?.[0];
    const backDni = req.files['backDni']?.[0];
    const certificates = req.files['certificates']?.[0]; // Solo para cuidadores

    console.log('Datos recibidos:', { name, email, userType, country });

    // Validar campos obligatorios
    if (!name || !email || !password || !userType || !country || !profilePhoto || !frontDni || !backDni) {
      console.log('Error: Faltan campos obligatorios');
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    // Validar si es cuidador y no subió certificados
    if (userType === 'Cuidador' && !certificates) {
      console.log('Error: Los cuidadores deben subir certificados');
      return res.status(400).json({ message: 'Los cuidadores deben subir certificados' });
    }

    // Conectar a MongoDB
    await connectToDatabase();

    // Verificar si el correo ya está registrado
    console.log('Verificando si el correo ya está registrado...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('El correo ya está registrado');
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña
    console.log('Encriptando la contraseña...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    console.log('Creando un nuevo usuario...');
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userType,
      country,
      profilePhoto: profilePhoto.buffer.toString('base64'), // Guardar imagen como base64
      frontDni: frontDni.buffer.toString('base64'), // Guardar imagen como base64
      backDni: backDni.buffer.toString('base64'), // Guardar imagen como base64
      certificates: certificates ? certificates.buffer.toString('base64') : null, // Solo si es cuidador
    });

    // Guardar el usuario en la base de datos
    await newUser.save();
    console.log('Usuario registrado con éxito');

    // Responder con éxito
    return res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
  } catch (error) {
    console.error('Error inesperado en el servidor:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

export default handler;
