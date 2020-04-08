require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);


//Bands in Town API key
var bandsintownAPI= "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"


//OMDB API key
var omdbApi = "http://www.omdbapi.com/?i=tt3896198&apikey=936bc22f"

function Spotify() {
    
}