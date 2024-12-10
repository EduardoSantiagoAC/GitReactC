import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  classification: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  breed: { type: String },
  size: { type: String },
  age: { type: Number },
  diet: { type: String },
  food: { type: String },
  image: { type: String, required: true },
  vaccination: { type: String },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Relación con el usuario
}, { timestamps: true });

export default mongoose.models.Pet || mongoose.model('Pet', petSchema);
