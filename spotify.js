// Require Spotify
var Spotify = require('spotify-web');
var xml2js = require('xml2js');
var superagent = require('superagent');

// Takes username and password from command line so you don't save them in git
var username = process.argv[2];
var password = process.argv[3];
var query = process.argv[4];

Spotify.login(username, password, function(err, spotify) {
  if (err)
    throw err;

  spotify.search(query, function(err, xml) {
    if (err)
      throw err;
    spotify.disconnect();

    var parser = new xml2js.Parser();
    parser.on('end', function(data) {
      console.log(JSON.stringify(data, null, 2));
    });
    parser.parseString(xml);
  });
});