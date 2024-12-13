import bcrypt from 'bcrypt';
import Cors from 'cors';
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

    // Revisar qué datos llegan
    console.log('Datos recibidos:', req.body);

    // Extraer datos
    const { name, email, password, userType, country, profilePhoto, frontDni, backDni, certificates } = req.body || {};

    // Validar campos obligatorios
    if (
      !name ||
      !email ||
      !password ||
      !userType ||
      !country ||
      !profilePhoto ||
      !frontDni ||
      !backDni
    ) {
      console.log('Error: Campos obligatorios faltantes');
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    // Si el usuario es cuidador, validar que haya subido certificados
    if (userType === 'Cuidador' && !certificates) {
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
      certificates: userType === 'Cuidador' ? certificates : null,
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
