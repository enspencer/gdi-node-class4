//*
// Set up Express
//*
var express = require('express');
// define our app as an instance of express
var app = express();
// specify which port to listen on
var port = process.env.PORT || 9000;

//*
// Set up Mongoose
//*
var mongoose = require('mongoose');
// body-parser allows us to parse json from requests coming into our API
var bodyParser = require('body-parser');
// Tell mongoose which db to connect to
mongoose.connect('mongodb://localhost/test');
// We have a mongoose representation of what a dinosaur looks like in the database
// This is analogous to a row in a SQL table
var Dinosaur = require('./models/dinosaur');
// Middleware that allows us to use the body-parser module
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//*
// Set up Mustache
//*
var mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Create a base route!
app.get('/', function(req, res) {
  res.render('welcome', {
    title: 'Welcome!',
    message: "Let's make some dinosaurs."
  });
});

// Create
app.post('/dinosaurs', function(req, res) {
  var dino = new Dinosaur();
  dino.name = req.body.name;
  dino.age = req.body.age;
  dino.favoriteColor = req.body.favoriteColor;
  console.log(dino);
  dino.save(function(err, dino) {
    console.log(err);
    console.log(dino);
    if (err)
      res.send(err);

    res.json({
      message: 'Dino created!'
    });
  });
});

app.put('/dinosaurs/:id', function(req, res) {
  Dinosaur.findById(req.params.id, function(err, dino) {
    dino.name = req.body.name;
    dino.age = req.body.age;
    dino.favoriteColor = req.body.favoriteColor;
    dino.save(function(err, dino) {
      console.log(err);
      console.log(dino);
      if (err)
        res.send(err);

      res.json({
        message: 'Dino updated!'
      });
    });
  });
});

// Read all
// TO DO:
// 1. Return the dinos response to the client
// 2. Render the dinos response with the list.mustache template
app.get('/dinosaurs', function(req, res) {
  Dinosaur.find(function(err, dinos) {
    res.json(dinos);
  });
});

// Read one
// TO DO:
// 1. Return the dino response to the client
// 2. Render the dino response with the read.mustache template
app.get('/dinosaurs/:id', function(req, res) {
  Dinosaur.findById(req.params.id, function(err, dino) {
    dino.speak();
  // Dinosaur.speak();
  });
});

// Delete one
app.delete('/dinosaurs/:id', function(req, res) {
  Dinosaur.remove({
    id: req.params.id
  }, function(err, dino) {
    if (err)
      res.send(err);

    res.json();
  });
});

// Start the server
app.listen(port);
console.log('We are on port ' + port + '. Check out localhost:9000!');