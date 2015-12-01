//*
// Set up Express
//*
var express = require('express');
// define our app as an instance of express
var app = express();
// specify which port to listen on
var port = process.env.PORT || 9000;

// Request.js allows us to make HTTP calls
var request = require('request');

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
  var url = 'https://api.spotify.com/v1/search?q=';
  console.log(req.body);

  // TO DO #1:
  // Get the query and type from req.body and append them to the URL so it looks like this: https://api.spotify.com/v1/search?q=QUERY&type=TYPE
  // where QUERY and TYPE are the parameters from req.body

  // TO DO #2:
  // Pass in the URL from TO DO #1
  // If there is an error return the error
  // Otherwise return the body of the successful response
  request(url, function(error, response, body) {
    res.send('results') // Send the results
  });

});

// Start the server
app.listen(port);
console.log('We are on port ' + port + '. Check out localhost:9000!');