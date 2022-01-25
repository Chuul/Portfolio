const mongoose = require('mongoose');

const { Schema } = mongoose;
const itemSchema = new Schema({
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
  pos_latlng : {
    type: Object
  }
});

module.exports = mongoose.model('item', itemSchema);