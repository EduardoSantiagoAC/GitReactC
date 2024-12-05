import Cors from 'cors';

// Inicializa el middleware de CORS
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// Función que ejecuta el middleware
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
  // Ejecutar el middleware de CORS
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    try {
      const { name, email, password, userType, profilePhoto } = req.body;
      // Lógica de registro del usuario
      res.status(200).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Hubo un problema procesando la solicitud' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
