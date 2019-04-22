const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuantitySchema = require('./quantity');
const Category = require('./category');

const ProductSchema = new Schema({
  category_id : {
    type : Schema.Types.ObjectId,
    ref : Category},
  name : String,
  hindi_name : String,
  image : String,
  quantity : [QuantitySchema],
  isActive : Boolean,
});

const Product = mongoose.model('product',ProductSchema);

module.exports = Product;
