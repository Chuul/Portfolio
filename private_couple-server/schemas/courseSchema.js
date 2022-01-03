const mongoose = require('mongoose');

const { Schema } = mongoose;
const courseSchema = new Schema({
  name: Number,
  course: Array
});

module.exports = mongoose.model('course', courseSchema);