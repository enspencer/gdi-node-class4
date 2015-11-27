var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Dinosaur = require('./models/dinosaur');

var callback = function(err, data) {
  if (err) return err;
  console.log(data);
};

Dinosaur.find({
  age: {
    $gt: 12,
    $lt: 20
  }
}).limit(3).sort({
  age: -1
}).exec(callback);