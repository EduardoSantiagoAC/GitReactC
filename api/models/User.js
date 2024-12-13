import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { 
    type: String, 
    required: true, 
    enum: ['Usuario General', 'Cuidador', 'Dueño'], // Limitar a los valores posibles
  },
  profilePhoto: { type: String, required: true }, // URL de la foto de perfil
  country: { type: String, required: true }, // País del usuario
  frontDni: { type: String, required: true }, // URL de la foto frontal del DNI
  backDni: { type: String, required: true }, // URL de la foto trasera del DNI
  certificates: { 
    type: String, 
    required: function() {
      return this.userType === 'Cuidador'; // Certificados solo obligatorios si es Cuidador
    } 
  },
}, { timestamps: true }); // timestamps agrega createdAt y updatedAt automáticamente

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
