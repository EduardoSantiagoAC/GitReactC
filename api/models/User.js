// /models/User.js
import mongoose from 'mongoose';

// Esquema para el usuario
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    profilePhoto: { type: String, required: true }, // Puedes almacenar la URL de la foto aquí
  },
  { timestamps: true }
);

// Crear un modelo para el usuario
const User = mongoose.model('User', userSchema);

export default User;
