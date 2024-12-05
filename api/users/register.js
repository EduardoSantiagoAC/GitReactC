// api/users/register.js

import Cors from 'cors';
import multiparty from 'multiparty';

// Configura CORS
const cors = Cors({
  methods: ['POST', 'GET'],
  origin: '*', // Permitir solicitudes de cualquier origen
});

// Middleware de CORS
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
  // Ejecutar middleware de CORS
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    try {
      // Registrar el cuerpo de la solicitud en los logs
      console.log('Datos recibidos en la solicitud:', req.body);

      // Extraer los datos del cuerpo de la solicitud
      const { name, email, password, userType, profilePhoto } = req.body;

      // Validar los campos
      if (!name || !email || !password || !userType || !profilePhoto) {
        console.log('Error: Faltan campos obligatorios');
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
      }

      // Aquí iría la lógica para guardar el usuario
      console.log('Usuario registrado con éxito');
      return res.status(200).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
      // Capturar cualquier error inesperado
      console.error('Error interno:', error);
      return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
    }
  } else {
    // Si no es POST, devuelve un error 405
    res.status(405).json({ message: 'Método no permitido' });
  }
}
