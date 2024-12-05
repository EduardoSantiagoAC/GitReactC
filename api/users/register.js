import Cors from 'cors';
import multiparty from 'multiparty';
import mongoose from 'mongoose';

// Conexión a MongoDB
const connectDb = async () => {
  const dbUri = 'mongodb+srv://SantiagoOwner:unlock255@cluster0.m8x4t.mongodb.net/BasedeDatos1?retryWrites=true&w=majority';
  
  try {
    await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};

// Esquema de Usuario
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  userType: String,
  profilePhoto: String,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

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

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const form = new multiparty.Form();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error al procesar los datos:', err);
        return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
      }

      const { name, email, password, userType } = fields;
      const profilePhoto = files.profilePhoto?.[0];

      if (!name || !email || !password || !userType || !profilePhoto) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
      }

      // Conectar con la base de datos
      await connectDb();

      // Crear un nuevo usuario
      const newUser = new User({
        name: name[0],
        email: email[0],
        password: password[0],
        userType: userType[0],
        profilePhoto: profilePhoto[0].path,
      });

      try {
        // Guardar el usuario en la base de datos
        await newUser.save();
        return res.status(200).json({ message: 'Usuario registrado con éxito' });
      } catch (error) {
        console.error('Error al guardar el usuario:', error);
        return res.status(500).json({ message: 'Hubo un error al registrar el usuario' });
      }
    });
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
