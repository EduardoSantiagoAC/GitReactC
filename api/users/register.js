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
      console.log('Método HTTP no permitido');
      return res.status(405).json({ message: 'Método no permitido' });
    }

    // Extraer datos del cuerpo de la solicitud
    const { 
      name, 
      email, 
      password, 
      userType, 
      profilePhoto, 
      country, 
      frontDni, 
      backDni, 
      certificates 
    } = req.body;

    console.log('Datos recibidos:', { name, email, userType, country });

    // Validar campos obligatorios
    if (!name || !email || !password || !userType || !profilePhoto || !country || !frontDni || !backDni) {
      console.log('Error: Faltan campos obligatorios');
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    // Si el usuario es cuidador, validar que haya subido certificados
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
    const hashedPassword = await bcrypt.hash(password, 10); // Genera un hash con un salt de 10 rondas

    // Crear un nuevo usuario
    console.log('Creando un nuevo usuario...');
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Guardar la contraseña encriptada
      userType,
      profilePhoto,
      country,
      frontDni,
      backDni,
      certificates: userType === 'Cuidador' ? certificates : null, // Solo guardar certificados si es cuidador
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
}
