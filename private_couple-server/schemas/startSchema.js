const mongoose = require('mongoose');

const { Schema } = mongoose;
const startSchema = new Schema({
  createdBy: {
    type: String,
    required: true
  },
  course: {
    type: Array,
    required: true
  },
});

module.exports = mongoose.model('start', startSchema);