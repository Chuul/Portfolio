const mongoose = require('mongoose');

const { Schema } = mongoose;
// const { Types: {ObjectId}} = Schema;
const itemSchema = new Schema({
  category : {
    type: String,
  },
  name : {
    type: String,
    required: true,
    unique: true,
  },
  checked : {
    type: Boolean,
  }, 
  url : {
    type: String,
  },
  // urlCheck : {
  //   type: Boolean,
  // },
  pos : {
    type: String,
  },
  // posCheck : {
  //   type: Boolean,
  // },
  // filtered : {
  //   type: Boolean,
  // },
});

module.exports = mongoose.model('item', itemSchema);