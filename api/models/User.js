import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  country: { type: String, required: true },
  profilePhoto: { type: String, required: true },  // URL de la imagen en Cloudinary
  frontDni: { type: String, required: true },  // URL de la imagen en Cloudinary
  backDni: { type: String, required: true },  // URL de la imagen en Cloudinary
  certificates: { type: String },  // URL de la imagen en Cloudinary (solo para cuidadores)
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
