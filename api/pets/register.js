import connectToDatabase from '../config/db'; // Conexión a la base de datos
import Pet from '../models/Pet'; // Modelo de mascota
import Cors from 'cors';

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

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, cors);

    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Método no permitido' });
    }

    await connectToDatabase();

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
    });

    await newPet.save();

    res.status(201).json({ message: 'Mascota registrada exitosamente.', pet: newPet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
}
