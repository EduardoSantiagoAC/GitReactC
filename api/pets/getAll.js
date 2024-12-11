import connectToDatabase from '../config/db'; // Ajusta la ruta si es necesario
import Pet from '../models/Pet'; // Ajusta la ruta si es necesario
import jwt from 'jsonwebtoken'; // Para verificar el token JWT

// Clave secreta para JWT (asegúrate de almacenarla en variables de entorno)
const JWT_SECRET = process.env.JWT_SECRET || 'tuClaveSecreta';

const handler = async (req, res) => {
  try {
    // Verificar que el método sea GET
    if (req.method !== 'GET') {
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
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido o expirado. Por favor, inicia sesión nuevamente.' });
    }

    // Extraer el userId del token decodificado
    const userId = decoded.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado.' });
    }

    // Obtener todas las mascotas, con una opción para filtrar por usuario
    const pets = await Pet.find({ userId });

    // Responder con los datos de las mascotas
    res.status(200).json({ pets });
  } catch (error) {
    console.error('Error al obtener las mascotas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export default handler;
