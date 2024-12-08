import Cors from 'cors';
import mongoose from 'mongoose';
import User from '../models/User'; // Asegúrate de que la ruta sea correcta

// Inicializar CORS
const cors = Cors({
  methods: ['POST'], // Solo permite métodos POST
  origin: '*',
});

// Middleware para ejecutar CORS
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

// Función para conectar a MongoDB
const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Ya estamos conectados a MongoDB');
    return;
  }

  try {
    console.log('Intentando conectar a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI); // Usa la URI desde las variables de entorno
    console.log('Conexión a MongoDB establecida');
  } catch (error) {
    console.error('Error de conexión con MongoDB:', error.message);
    throw new Error('No se pudo conectar a la base de datos');
  }
};

// Endpoint principal
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

    // Validar los datos de la solicitud
    const { name, email, password, userType, profilePhoto } = req.body;
    console.log('Datos recibidos:', { name, email, userType, profilePhoto });

    if (!name || !email || !password || !userType || !profilePhoto) {
      console.log('Error: Faltan campos obligatorios');
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    // Conectar a la base de datos
    await connectToDatabase();

    // Verificar si el usuario ya existe
    console.log('Verificando si el correo ya está registrado...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('El correo ya está registrado');
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Crear un nuevo usuario
    console.log('Creando un nuevo usuario...');
    const newUser = new User({
      name,
      email,
      password, // En producción, asegúrate de encriptar esta contraseña con bcrypt u otra librería
      userType,
      profilePhoto, // Guardamos la URL de la imagen
    });

    // Guardar el usuario en la base de datos
    await newUser.save();
    console.log('Usuario registrado con éxito');

    // Responder con éxito
    return res.status(200).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error inesperado en el servidor:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}
