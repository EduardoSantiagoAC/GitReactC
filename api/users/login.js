import bcrypt from 'bcrypt'; // Cambia a bcryptjs si tienes problemas con bcrypt
import Cors from 'cors';
import jwt from 'jsonwebtoken'; // Para generar el token JWT
import connectToDatabase from '../config/db'; // Importa la función de conexión desde db.js
import User from '../models/User'; // Asegúrate de que la ruta sea correcta

// Configuración de CORS
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

// Clave secreta para JWT (asegúrate de almacenarla en variables de entorno)
const JWT_SECRET = process.env.JWT_SECRET || 'Unlock255';

// Endpoint principal
export default async function handler(req, res) {
  try {
    console.log('Iniciando el endpoint de login...');

    // Ejecutar middleware de CORS
    await runMiddleware(req, res, cors);
    console.log('CORS ejecutado correctamente');

    // Validar método HTTP
    if (req.method !== 'POST') {
      console.log('Método HTTP no permitido');
      return res.status(405).json({ message: 'Método no permitido' });
    }

    // Obtener datos del cuerpo de la solicitud
    const { email, password } = req.body;
    console.log('Datos recibidos:', { email });

    // Validar campos
    if (!email || !password) {
      console.log('Error: Faltan campos obligatorios');
      return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
    }

    // Conectar a MongoDB
    await connectToDatabase();

    // Buscar usuario en la base de datos
    console.log('Buscando usuario en la base de datos...');
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }
    console.log('Usuario encontrado:', user);

    // Comparar contraseñas
    console.log('Comparando contraseñas...');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Contraseña incorrecta');
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }
    console.log('Contraseña válida');

    // Generar un token JWT
    const token = jwt.sign(
      {
        userId: user._id, // Incluye el userId en el payload del token
        name: user.name,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: '2h' } // Configura el tiempo de expiración del token
    );

    // Responder con los datos del usuario y el token
    console.log('Inicio de sesión exitoso');
    return res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token, // Devuelve el token JWT
      user: {
        id: user._id, // Incluye el userId explícitamente
        name: user.name,
        email: user.email,
        userType: user.userType,
        profilePhoto: user.profilePhoto,
      },
    });
  } catch (error) {
    console.error('Error inesperado en el servidor:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}
