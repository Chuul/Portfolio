const mongoose = require('mongoose');

const { Schema } = mongoose;
const loginSchema = new Schema({
  username : {
    type: String,
    required: true,
    unique: true,
  },
  email : {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('login', loginSchema);