import Cors from 'cors';
import multiparty from 'multiparty';

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

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error al procesar los datos:', err);
        return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
      }

      console.log('Campos:', fields);
      console.log('Archivos:', files);

      const { name, email, password, userType } = fields;
      const profilePhoto = files.profilePhoto?.[0];

      if (!name || !email || !password || !userType || !profilePhoto) {
        console.log('Error: Faltan campos obligatorios');
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
      }

      console.log('Usuario registrado con éxito');
      return res.status(200).json({ message: 'Usuario registrado con éxito' });
    });
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
