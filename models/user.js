const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AddressSchema = require('./address');

const userSchema = new Schema ({
name : String,
phonenumber : String,
isActive : Boolean,
address : [AddressSchema]
});

const users = mongoose.model('user', userSchema);

module.exports = users;
