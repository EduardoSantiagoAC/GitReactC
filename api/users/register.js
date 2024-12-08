import Cors from 'cors';
import mongoose from 'mongoose';
import User from '../models/User'; // Asegúrate de que la ruta sea correcta

// Inicializar CORS
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

// Conectar a MongoDB
const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Ya estamos conectados a MongoDB');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error de conexión con MongoDB:', error);
    throw new Error('No se pudo conectar a la base de datos');
  }
};

export default async function handler(req, res) {
  try {
    // Ejecutar CORS
    await runMiddleware(req, res, cors);

    // Validar método HTTP
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Método no permitido' });
    }

    const { name, email, password, userType, profilePhoto } = req.body;

    if (!name || !email || !password || !userType || !profilePhoto) {
      console.error('Error: Faltan campos obligatorios');
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('El correo ya está registrado');
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const newUser = new User({
      name,
      email,
      password, // Asegúrate de encriptar la contraseña antes de guardar
      userType,
      profilePhoto,
    });

    await newUser.save();
    console.log('Usuario registrado con éxito');

    return res.status(200).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error inesperado en el servidor:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}
