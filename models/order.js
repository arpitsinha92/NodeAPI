const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Product = require('./selected_product');

const OrderSchema = new Schema({
user : {
  type : Schema.Types.ObjectId,
  ref : User },
  name : String,
product : [Product],
totalPrice : Number,
payment_mode : String,
payment_id : String,
status : String,
address : String,
payment_status : String,
ordered_date : Date,
isActive : Boolean
});

const order = mongoose.model("order",OrderSchema);

module.exports = order;
