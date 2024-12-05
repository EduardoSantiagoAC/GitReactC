// api/users/register.js

import Cors from 'cors';

// Inicializar CORS
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: '*', // Permite solicitudes desde cualquier origen (ajústalo según sea necesario)
});

// Función para ejecutar el middleware CORS
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
  // Ejecutar el middleware CORS
  await runMiddleware(req, res, cors);

  // Verificar que la solicitud sea POST
  if (req.method === 'POST') {
    try {
      const { name, email, password, userType, profilePhoto } = req.body;

      if (!name || !email || !password || !userType) {
        return res.status(400).json({ message: 'Faltan datos requeridos.' });
      }

      // Aquí puedes agregar la lógica de almacenamiento o validación de usuarios
      // Ejemplo de un usuario simulado
      const newUser = {
        name,
        email,
        password,
        userType,
        profilePhoto,
      };

      // Supongamos que guardamos al usuario en una base de datos o archivo
      // Si todo está bien, devolvemos una respuesta de éxito
      return res.status(201).json({ message: 'Usuario registrado exitosamente.', user: newUser });
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
    }
  } else {
    // Si no es un método POST, se devuelve un error 405
    return res.status(405).json({ message: 'Método no permitido' });
  }
}
