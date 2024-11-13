const mongoose = require('mongoose');

// Определяем схему товара
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Поле id
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);