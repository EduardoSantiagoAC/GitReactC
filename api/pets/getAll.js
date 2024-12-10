import connectToDatabase from '../config/db'; // Ajusta la ruta si es necesario
import Pet from '../models/Pet'; // Ajusta la ruta si es necesario

const handler = async (req, res) => {
    try {
      if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Método no permitido' });
      }
  
      // Conectar a la base de datos
      await connectToDatabase();
  
      // Obtener todas las mascotas
      const pets = await Pet.find();
  
      // Responder con los datos de las mascotas
      res.status(200).json({ pets });
    } catch (error) {
      console.error('Error al obtener las mascotas:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
  
  module.exports = handler;