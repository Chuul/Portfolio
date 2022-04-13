const mongoose = require('mongoose');

const { Schema } = mongoose;
const creatingSchema = new Schema({
  createdBy: {
    type: String,
    required: true
  },
  category : {
    type: String,
  },
  name : {
    type: String,
    required: true,
    unique: true,
  },
  checked : {
    type: Boolean
  },
  url : {
    type: String,
  },
  pos : {
    type: String,
  },
});

module.exports = mongoose.model('creating', creatingSchema);