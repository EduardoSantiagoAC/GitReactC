const mongoose = require('mongoose');

// Esquema de la mascota
const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  classification: { type: String, required: true },
  breed: { type: String, required: true },
  size: { type: String, required: true },
  age: { type: Number, required: true },
  diet: { type: String, required: true },
  food: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

// Exportar el modelo
const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
