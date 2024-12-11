import connectToDatabase from '../config/db'; // Ajusta la ruta si es necesario
import Pet from '../models/Pet'; // Ajusta la ruta si es necesario
import jwt from 'jsonwebtoken'; // Para verificar el token JWT

// Clave secreta para JWT (asegúrate de almacenarla en variables de entorno)
const JWT_SECRET = process.env.JWT_SECRET || 'Unlock255';

const handler = async (req, res) => {
  try {
    // Verificar que el método sea GET
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Método no permitido' });
    }

    // Conectar a la base de datos
    await connectToDatabase();

    // Verificar si se envió un token en los encabezados
    const token = req.headers.authorization?.split(' ')[1];
    let decoded = null;
    if (token) {
      try {
        decoded = jwt.verify(token, JWT_SECRET);
      } catch (error) {
        console.warn('Token inválido o expirado. Continuando sin autenticación.');
      }
    }

    let pets;
    if (decoded && decoded.userId) {
      // Si se proporciona un token válido, filtrar las mascotas por usuario
      const userId = decoded.userId;
      pets = await Pet.find({ userId });
    } else {
      // Si no hay token o no es válido, devolver todas las mascotas
      pets = await Pet.find();
    }

    // Responder con los datos de las mascotas
    res.status(200).json({ pets });
  } catch (error) {
    console.error('Error al obtener las mascotas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export default handler;
