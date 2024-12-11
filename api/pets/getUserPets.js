import connectToDatabase from '../config/db';
import Pet from '../models/Pet';
import Cors from 'cors';
import jwt from 'jsonwebtoken';

const cors = Cors({
  methods: ['GET'],
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

const JWT_SECRET = process.env.JWT_SECRET || 'Unlock255';

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, cors);

    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Método no permitido' });
    }

    await connectToDatabase();

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado. Usuario no autenticado.' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido o expirado. Por favor, inicia sesión nuevamente.' });
    }

    const userId = decoded.userId;

    const pets = await Pet.find({ ownerId: userId }); // Filtrar mascotas por ownerId
    res.status(200).json({ pets });
  } catch (error) {
    console.error('Error al obtener las mascotas del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
}
