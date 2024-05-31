const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId:{
  type: String,
  required: true,
  unique: true
  },
  email:{
    type: String,
    required: true,
    unique: true
    } ,
  name: {
    type: String,
    required: true,
    },
  accessToken: {
    type: String,
    },
  refreshToken:{
    type: String,
    } ,
});

module.exports = mongoose.model('User', UserSchema);
