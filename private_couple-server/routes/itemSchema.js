const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
  category : String, 
  name : String,
  checked : Boolean, 
  url : String,
  urlCheck : Boolean,
  pos : String,
  posCheck : Boolean,
  filtered : Boolean,
});
module.exports = mongoose.model('creates', itemSchema);