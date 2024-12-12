// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  profilePhoto: { type: String },  // Esto podría ser un URL de la foto subida
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
