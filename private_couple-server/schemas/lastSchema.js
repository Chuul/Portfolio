const mongoose = require('mongoose');

const { Schema } = mongoose;
const lastSchema = new Schema({
  // category : {
  //   type: String,
  // },
  name : {
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
  // comment : {
  //   type: String
  // },
  // url : {
  //   type: String,
  // },
  // pos : {
  //   type: String,
  // },
});

module.exports = mongoose.model('last', lastSchema);