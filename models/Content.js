var mongoose = require('mongoose');
var ContentSchema = new mongoose.Schema({
  title: String,
  content:String,
  picture:String,
});

mongoose.model('Content', ContentSchema);