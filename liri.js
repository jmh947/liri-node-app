require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios");
var command = process.argv[2];
var value = process.argv[3];

var pick = function( command, value) { 
    switch (command) {
        case 'concert-this':
            showConcertInfo(command, value,);
            break;
        case 'spotify-this-song':
            showSongInfo(command, value);
            break;
        case 'movie-this':
            showMovieInfo(command, value);
            break;
        case 'do-what-it-says':
            showSomeInfo(command, value);
            break;
        default:
            console.log("Invalid Option. Please type Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
        }
}


//OMDB API key
var omdbApi = "http://www.omdbapi.com/?i=tt3896198&apikey=936bc22f"

//Bands in town function
function showConcertInfo( command , value) {
    console.log(command);
    console.log(value);
    var artist = value || "Celine Dion"
    var bandsInTownURL= "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

            axios.get(bandsInTownURL)
            .then(function (response) {
              // handle success
              console.log(response.data);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .finally(function () {
              // always executed
            });

}

function showSongInfo(command, value) {
    console.log(command);
    console.log(value);
    var artist = value || "The Sign"
 
// var spotify = new Spotify({
//   id: <your spotify client id>,
//   secret: <your spotify client secret>
// });
 
spotify.search({ type: 'track', query: value }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
    
}

var runThis = function(arg1, arg2){
    pick(arg1, arg2)
}
runThis(command, value)