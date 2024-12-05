// api/users/register.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { name, email, password, userType, profilePhoto } = req.body;
  
        // Log de los datos recibidos
        console.log("Datos recibidos:", req.body);
  
        if (!name || !email || !password || !userType || !profilePhoto) {
          return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }
  
        // Simula el registro del usuario (por ejemplo, en una base de datos)
        // Aquí iría la lógica de guardado, como en una base de datos o archivo.
  
        // Si todo va bien
        return res.status(200).json({ message: 'Usuario registrado correctamente.' });
  
      } catch (error) {
        // Si ocurre algún error, lo mostramos en los logs
        console.error("Error en el backend:", error);
        return res.status(500).json({ error: 'Hubo un problema al procesar la solicitud.' });
      }
    }
  }
  