import bcrypt from 'bcrypt';
import Cors from 'cors';
import jwt from 'jsonwebtoken'; // Para generar el token JWT
import connectToDatabase from '../config/db';
import User from '../models/User';

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

// Clave secreta para JWT (asegúrate de almacenarla en variables de entorno)
const JWT_SECRET = process.env.JWT_SECRET || 'Unlock255';

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

    const { name, email, password, userType, profilePhoto } = req.body;
    console.log('Datos recibidos:', { name, email, userType, profilePhoto });

    if (!name || !email || !password || !userType || !profilePhoto) {
      console.log('Error: Faltan campos obligatorios');
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    // Conectar a MongoDB
    await connectToDatabase();

    // Verificar si el usuario ya existe
    console.log('Verificando si el correo ya está registrado...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('El correo ya está registrado');
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña
    console.log('Encriptando la contraseña...');
    const hashedPassword = await bcrypt.hash(password, 10); // Genera un hash con un salt de 10 rondas

    // Generar un token JWT
    console.log('Generando token JWT...');
    const token = jwt.sign(
      {
        name,
        email,
      },
      JWT_SECRET,
      { expiresIn: '2h' } // Tiempo de expiración del token
    );

    // Crear un nuevo usuario
    console.log('Creando un nuevo usuario...');
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Guardar la contraseña encriptada
      userType,
      profilePhoto,
      token, // Guardar el token generado en la base de datos
    });

    // Guardar el usuario en la base de datos
    await newUser.save();
    console.log('Usuario registrado con éxito');

    // Responder con éxito y enviar el token al cliente
    return res.status(200).json({
      message: 'Usuario registrado con éxito',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        userType: newUser.userType,
        profilePhoto: newUser.profilePhoto,
      },
      token,
    });
  } catch (error) {
    console.error('Error inesperado en el servidor:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}
