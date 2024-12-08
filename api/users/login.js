import bcrypt from 'bcrypt';
import User from '../models/User'; // Asegúrate de que la ruta sea correcta
import Cors from 'cors';

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
    // Ejecutar middleware de CORS
    await runMiddleware(req, res, cors);

    // Validar el método HTTP
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Método no permitido' });
    }

    // Obtener los datos del cuerpo de la solicitud
    const { email, password } = req.body;

    // Validar que los campos no estén vacíos
    if (!email || !password) {
      return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
    }

    // Buscar al usuario en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña ingresada con la almacenada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Responder con los datos del usuario
    return res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: {
        name: user.name,
        email: user.email,
        userType: user.userType,
        profilePhoto: user.profilePhoto,
      },
    });
  } catch (error) {
    console.error('Error inesperado:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}
