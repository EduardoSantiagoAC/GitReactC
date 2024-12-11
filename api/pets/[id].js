import connectToDatabase from '../config/db'; // Conexión a la base de datos
import Pet from '../models/Pet'; // Modelo de la mascota
import Cors from 'cors';
import mongoose from 'mongoose';

// Configuración de CORS
const cors = Cors({
  methods: ['GET'], // Solo permite métodos GET
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

const handler = async (req, res) => {
  try {
    await runMiddleware(req, res, cors);

    if (req.method !== 'GET') {
      return res.status(405).json({ success: false, message: 'Método no permitido.' });
    }

    await connectToDatabase();

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ success: false, message: 'Se requiere un ID de mascota.' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'El ID de la mascota no es válido.' });
    }

    const pet = await Pet.findById(id);

    if (!pet) {
      return res.status(404).json({ success: false, message: 'No se encontró la mascota solicitada.' });
    }

    res.status(200).json({
      success: true,
      message: 'Detalles de la mascota obtenidos con éxito.',
      pet,
    });
  } catch (error) {
    console.error('Error al obtener los detalles de la mascota:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor.',
      error: error.message,
    });
  }
};

export default handler;
