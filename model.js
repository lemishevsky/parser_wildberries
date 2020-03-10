const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  brand: String,
  article: String,
  name: String,
  type: String,
  gender: String,
  price: String,
  color: String,
  rusSize: Array,
  manSize: Array,
  description: String,
  imgUrl: Array,
  picture: String,
  url: String
});

module.exports = mongoose.model("Item", itemSchema);