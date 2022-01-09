const mongoose = require('mongoose');

const { Schema } = mongoose;
const itemSchema = new Schema({
  category : {
    type: String,
  },
  name : {
    type: String,
    required: true,
    unique: true,
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