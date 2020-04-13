require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios");
var command = process.argv[2];
var value = process.argv[3];

var choose = function (command, value) {
  switch (command) {
    case "concert-this":
      showConcertInfo(command, value);
      break;
    case "spotify-this-song":
      showSongInfo(command, value);
      break;
    case "movie-this":
      showMovieInfo(command, value);
      break;
    // case "do-what-it-says":
    //   showSomeInfo(command, value);
    //   break;
    default:
      console.log(
        "Invalid Option. Please type Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says"
      );
  }
};

//Bands in town function
function showConcertInfo(command, value) {
  console.log(command);
  console.log(value);
  console.log("~~~~~~~EVENT INFO~~~~~~~")
  var artist = value || "Celine Dion";
  var bandsInTownURL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";

  axios
    .get(bandsInTownURL)
    .then(function (response) {

    for (let i = 0; i < response.data.length; i++) {
       
      //console.log(response.data);
      console.log(response.data[i].venue.name);
      console.log(response.data[i].venue.location);
      console.log(moment(response.data[i].datetime).format("MM/DD/YYYY hh:mm a"));
      
    }
    
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
  console.log("~~~~~~~SONG INFO~~~~~~~")
  var value = value || "The Sign";

  spotify
    .search({ type: "track", query: value })
    .then(function (response) {
      //console.log(response.tracks.items[0]);
      console.log(response.tracks.items[0].album.name);
      console.log(response.tracks.items[0].album.artists[0].name);
      console.log(response.tracks.items[0].name);
      console.log(response.tracks.items[0].preview_url);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function showMovieInfo(command, value) {
  console.log(command);
  console.log(value);
  console.log("~~~~~~~MOVIE INFO~~~~~~~")
  var value = value || "Mr. Nobody";
  axios.get('http://www.omdbapi.com/?apiKey=936bc22f'+ '&t='+ value).then((response) =>
  { //console.log(response); 
    console.log("Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("Rated: " + response.data.Rated);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Country movie was filmed in: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  
  });
  
  if (value === "Mr.Nobody") {
    console.log(
      "If you haven't watched Mr. Nobody then you should! It is on Netflix"
    );
  }
  }

// function showSomeInfo(command, value) {
//   console.log(command);
//   console.log(value);
// }


var runThis = function (arg1, arg2) {
  choose(arg1, arg2);
};
runThis(command, value);
