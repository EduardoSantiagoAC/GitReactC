import connectToDatabase from '../config/db'; // Conexión a la base de datos
import Pet from '../models/Pet';

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

    // Conectar a la base de datos
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
      ownerId, // Nuevo campo para asociar la mascota con un usuario
    } = req.body;

    // Validar que todos los campos requeridos estén presentes
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
      !image ||
      !ownerId // Validar que se pase el ID del usuario
    ) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    // Crear una nueva mascota con los datos proporcionados
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
      ownerId, // Asociar la mascota al ID del usuario
    });

    // Guardar la mascota en la base de datos
    await newPet.save();

    res.status(201).json({ message: 'Mascota registrada exitosamente.', pet: newPet });
  } catch (error) {
    console.error('Error al registrar la mascota:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
}
