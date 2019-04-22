const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userCredentialSchema = new Schema({

  name : string,
  phoneNumber : string,
  userName : string,
  password : string,
  isActive : Boolean
});


const userCredentials = moongose.model('userCredential' userCredentialSchema);

 module.exports = userCredentials;
