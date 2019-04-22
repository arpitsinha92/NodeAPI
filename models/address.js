const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
name : String,
house_number : String,
street : String,
city : String,
pincode : String,
landmark : String,
isActive : Boolean
});

module.exports = AddressSchema;
