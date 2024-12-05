import Cors from 'cors';
import multiparty from 'multiparty';
import mongoose from 'mongoose';
import User from '../../models/User'; // Asegúrate de que la ruta sea correcta

// Inicializar CORS
const cors = Cors({
  methods: ['POST', 'GET'],
  origin: '*',
});

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

// Conectar a MongoDB
const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Ya estamos conectados a MongoDB');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error de conexión con MongoDB:', error);
    throw new Error('No se pudo conectar a la base de datos');
  }
};

export default async function handler(req, res) {
  // Ejecutar CORS
  await runMiddleware(req, res, cors);

  // Solo aceptar el método POST
  if (req.method === 'POST') {
    const form = new multiparty.Form();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error al procesar los datos:', err);
        return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
      }

      console.log('Campos:', fields);
      console.log('Archivos:', files);

      // Validación de los campos
      const { name, email, password, userType } = fields;
      const profilePhoto = files.profilePhoto?.[0];

      if (!name || !email || !password || !userType || !profilePhoto) {
        console.log('Error: Faltan campos obligatorios');
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
      }

      // Conexión a la base de datos
      try {
        await connectToDatabase();

        // Crear un nuevo usuario
        const newUser = new User({
          name: name[0],
          email: email[0],
          password: password[0],
          userType: userType[0],
          profilePhoto: profilePhoto.originalFilename,
        });

        // Guardar el usuario en la base de datos
        await newUser.save();

        console.log('Usuario registrado con éxito');
        return res.status(200).json({ message: 'Usuario registrado con éxito' });
      } catch (error) {
        console.error('Error al guardar el usuario en la base de datos:', error);
        return res.status(500).json({ message: 'Hubo un error al guardar el usuario en la base de datos' });
      }
    });
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
