const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name : String,
  image : String,
  isActive : Boolean
});

const categories = mongoose.model('category',CategorySchema);

module.exports = categories;
