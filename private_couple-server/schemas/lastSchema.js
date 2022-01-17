const mongoose = require('mongoose');

const { Schema } = mongoose;
const lastSchema = new Schema({
  createdBy : {
    type: String,
    required: true,
    unique: true,
  },
  item : {
    type: Array,
  },
  course: {
    type: Array
  }
});

module.exports = mongoose.model('last', lastSchema);