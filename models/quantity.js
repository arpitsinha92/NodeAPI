const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuantitySchema = new Schema({
quantity : Number,
unit : String,
price : Number,
isActive : Boolean
});

module.exports = QuantitySchema;
