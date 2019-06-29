require("dotenv").config();
const keys = require("./keys");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
var inputCommand = process.argv[2];
var inputCommand2 = process.argv[3];

let spotify = new Spotify(keys.spotify);
//------------------

//function running
// app(process.argv[2], process.argv[3]);

//------------------

//setting up the unctions for running in node 
function app(command, paramaters) {
    switch (command) {
        case "concert-this":
            getMyBand(paramaters);
            break;
    
        case "spotify-this-song":
            getSpotify(paramaters);
            break;
    
        case "movie-this":
            getMovie(paramaters);
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;
    
        default: 
            console.log("LIRI doesn't know that command. Please try again.");
    }
}

//----------------

//band function for finding the bands and then console logging the name, location, and date of the show 
//WORKING RIGHT 
//command concert-this 
function getMyBand(artist) {
    console.log("getMyBand() executed");
    var artist = inputCommand2;
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response) {
        for(var i = 0; i < response.data.length; i++) {
        var show = {
            name: response.data[i].venue.name,
            location: response.data[i].venue.city + ", " + response.data[i].venue.country,
            date: moment(response.data[i].datetime).format('MM-DD-YYYY')
        };
        console.log("("+(i+1)+")" + "------------------------------------------------------------------");
        console.log("Name of Venue: " + show.name);
        console.log("Location: " + show.location);
        console.log("Date of Event: " + show.date);
        console.log("---------------------------------------------------------------------");
        }
      }
    );
}

//-----
//this is the function for finding spotify information and console logging it 
//THIS IS WORKING 
//command spotify-this-song 
    function getSpotify() {
        console.log("getSpotify() executed");
        var track = inputCommand2;
        var randomtrackSplit = [];
        if (track === undefined) {
            track = "The Sign";
          }
        spotify
        .search({ type: 'track', query: track})
        .then(function(response) {
         var songdata = {
            artistName: response.tracks.items[0].artists[0].name,
            songName: response.tracks.items[0].name,
            previewLink: response.tracks.items[0].external_urls.spotify,
            album: response.tracks.items[0].album.name
         };
       console.log("---------------------------------------------------------------------");
       console.log("Artist: " + songdata.artistName);
       console.log("Song Name: " + songdata.songName);
       console.log("Preview Link: " + songdata.previewLink);
       console.log("Album: " + songdata.album);
       console.log("---------------------------------------------------------------------");
    });
    
}

//------
//movie function for finding movie info, console logs Mr. Nobody if nothing is entered
//WORKS  
//command movie-this
function getMovie() {
    console.log("getMovie() executed");
    var movieTitle = inputCommand2;
    if (movieTitle === undefined) {
        movieTitle = "Mr Nobody";
      }
      var urlHit =
        "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=full&tomatoes=true&apikey=trilogy";
        //apikey=trilogy
    
      axios.get(urlHit).then(
        function(response) {
          var jsonData = response.data;
    
          console.log("Title: " + jsonData.Title);
          console.log("Year: " + jsonData.Year);
          console.log("Rated: " + jsonData.Rated);
          console.log("IMDB Rating: " + jsonData.imdbRating);
          console.log("Country: " + jsonData.Country);
          console.log("Language: " + jsonData.Language);
          console.log("Plot: " + jsonData.Plot);
          console.log("Actors: " + jsonData.Actors);
          console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
        }
      );
}

//---------
//this function takes info form the random.txt and does what it says, it will run one of the above functions depending on what's in the text file
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);
    
        var dataArr = data.split(",");
    
        if (dataArr.length === 2) {
          pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length === 1) {
          pick(dataArr[0]);
        }
      });
}

//------------
//final input 
switch(inputCommand) {
    case "concert-this":
        getMyBand();
        break;
    case "spotify-this-song":
        getSpotify();
        break;
    case "movie-this":
        getMovie();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
}
