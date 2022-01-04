const mongoose = require('mongoose');

const { Schema } = mongoose;
const startSchema = new Schema({
  name: Number,
  start: Object
});

module.exports = mongoose.model('start', startSchema);