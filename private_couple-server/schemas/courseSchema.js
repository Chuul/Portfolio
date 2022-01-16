const mongoose = require('mongoose');

const { Schema } = mongoose;
const courseSchema = new Schema({
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

module.exports = mongoose.model('course', courseSchema);