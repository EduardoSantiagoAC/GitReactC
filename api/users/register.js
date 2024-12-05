export default function handler(req, res) {
    if (req.method === 'POST') {
      const { name, email, password, userType } = req.body;
      const photo = req.files?.photo; // Suponiendo que usas un paquete como `formidable` para manejar archivos
  
      if (!name || !email || !password || !userType || !photo) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
      }
  
      // Aquí deberías guardar los datos en una base de datos (simulación por ahora)
      const newUser = {
        name,
        email,
        password,  // Recuerda encriptar la contraseña en producción
        userType,
        photo,
      };
  
      console.log("Nuevo usuario registrado:", newUser);
  
      return res.status(201).json({ message: 'Usuario registrado con éxito.' });
    } else {
      res.status(405).json({ message: 'Método no permitido' });
    }
  }
  