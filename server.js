//*
// Set up Express
//*
var express = require('express');
// define our app as an instance of express
var app = express();
// specify which port to listen on
var port = process.env.PORT || 9000;

var Spotify = require('spotify-web');
var xml2js = require('xml2js');
var superagent = require('superagent');

// body-parser allows us to parse json from requests coming into our API
var bodyParser = require('body-parser');
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
    message: "Let's make some music."
  });
});

app.get('/spotify', function(req, res) {
  res.render('spotify');
});

app.post('/spotify', function(req, res) {
  var username = 'your username';
  var password = 'your password';
  var query = req.body.query;

  Spotify.login(username, password, function(err, spotify) {
    if (err)
      throw err;

    spotify.starred(username, function(err, starred) {
      console.log(starred.contents);
      if (err)
        throw err;

      res.send(starred.contents);
      spotify.disconnect();

    });
  });

});

// Start the server
app.listen(port);
console.log('We are on port ' + port + '. Check out localhost:9000!');