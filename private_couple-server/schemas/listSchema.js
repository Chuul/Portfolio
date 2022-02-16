const mongoose = require('mongoose');

const { Schema } = mongoose;
const listSchema = new Schema({
  name: {
    type: Number,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  course: {
    type: Array,
    required: true
  },
});

module.exports = mongoose.model('list', listSchema);