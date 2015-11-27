var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DinosaurSchema = new Schema({
  name: String,
  age: Number,
  favoriteColor: String
});

module.exports = mongoose.model('Dinosaur', DinosaurSchema);