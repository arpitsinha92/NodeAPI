const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Quantity = require('./quantity');

const SelectedProdSchema = new Schema({
  product_id : String,
  product_name : String,
  quantity : Quantity,
  selectedQuantity : Number,
  isActive : Boolean
});

module.exports = SelectedProdSchema;
