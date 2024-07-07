const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  car_model: { type: String, required: true },
  price: { type: Number, required: true },
  phone: { type: Number, required: true },
  city: { type: String, required: true },
  images: [{ type: JSON }],
});

module.exports = carSchema;
