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

const date = new Date();
const year = date.getFullYear() % 100;
let month = date.getMonth() + 1;
if (month < 10) month = '0' + month;
let today = date.getDate();
if (today < 10) today = '0' + today;
let hours = date.getHours();
if (hours < 10) hours = '0' + hours;
let minutes = date.getMinutes()
if (minutes < 10) minutes = '0' + minutes;
const dateString = year + '-' + month + '-' + today + '_' + hours + ':' + minutes;


module.exports = mongoose.model(`${dateString}`, itemSchema);