// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  profilePhoto: { type: String },
  token: { type: String }, // Nuevo campo para almacenar el token JWT
});

export default mongoose.models.User || mongoose.model('User', userSchema);


