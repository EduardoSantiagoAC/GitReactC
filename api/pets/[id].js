import connectToDatabase from '../config/db'; // Conexión a la base de datos
import Pet from '../models/Pet'; // Modelo de la mascota
import Cors from 'cors';
import mongoose from 'mongoose'; // Para validar ObjectId

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
    // Ejecutar middleware de CORS
    await runMiddleware(req, res, cors);

    // Validar el método HTTP
    if (req.method !== 'GET') {
      return res.status(405).json({ success: false, message: 'Método no permitido.' });
    }

    // Conectar a la base de datos
    await connectToDatabase();

    // Obtener el ID de la mascota desde la URL
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ success: false, message: 'Se requiere un ID de mascota.' });
    }

    // Validar que el ID sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'El ID de la mascota no es válido.' });
    }

    // Buscar la mascota por su ID en la base de datos
    const pet = await Pet.findById(id);

    if (!pet) {
      return res.status(404).json({ success: false, message: 'No se encontró la mascota solicitada.' });
    }

    // Responder con los detalles de la mascota
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
