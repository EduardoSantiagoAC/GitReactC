import mongoose from 'mongoose';

const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Ya conectado a MongoDB');
    return;
  }

  try {
    console.log('Intentando conectar a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión establecida con MongoDB');
  } catch (error) {
    console.error('Error de conexión con MongoDB:', error.message);
    throw new Error('No se pudo conectar a la base de datos');
  }
};

export default connectToDatabase;
