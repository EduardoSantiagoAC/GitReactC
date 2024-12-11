import connectToDatabase from '../config/db'; // Conexión a la base de datos
import Pet from '../models/Pet';
import Cors from 'cors';
import jwt from 'jsonwebtoken'; // Para verificar el token JWT

// Inicializar CORS
const cors = Cors({
  methods: ['POST'],
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

export default async function handler(req, res) {
  try {
    // Ejecutar middleware de CORS
    await runMiddleware(req, res, cors);

    // Validar método HTTP
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Método no permitido' });
    }

    // Conectar a la base de datos
    await connectToDatabase();

    // Verificar el token JWT enviado en los encabezados
    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado. Usuario no autenticado.' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de que JWT_SECRET esté definido
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido o expirado. Por favor, inicia sesión nuevamente.' });
    }

    // Extraer el userId del token decodificado
    const userId = decoded.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado.' });
    }


    // Extraer datos del cuerpo de la solicitud
    const {
      name,
      type,
      classification,
      breed,
      size,
      age,
      diet,
      food,
      description,
      price,
      image,
    } = req.body;

    // Verificar que todos los campos requeridos estén presentes
    if (
      !name ||
      !type ||
      !classification ||
      !breed ||
      !size ||
      !age ||
      !diet ||
      !food ||
      !description ||
      !price ||
      !image
    ) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    // Crear una nueva mascota con la ID del usuario
    const newPet = new Pet({
      name,
      type,
      classification,
      breed,
      size,
      age,
      diet,
      food,
      description,
      price,
      image,
      userId, // Asignar automáticamente el userId del usuario autenticado
    });

    // Guardar en la base de datos
    await newPet.save();

    res.status(201).json({ message: 'Mascota registrada exitosamente.', pet: newPet });
  } catch (error) {
    console.error('Error al registrar la mascota:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
}
