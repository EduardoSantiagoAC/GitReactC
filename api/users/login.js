export default function handler(req, res) {
    if (req.method === 'POST') {
      // Aquí iría el código para autenticar al usuario
      return res.status(200).json({ message: 'Inicio de sesión exitoso.' });
    } else {
      return res.status(405).json({ message: 'Método no permitido.' });
    }
  }
  