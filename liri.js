//i need to download chalk into the right file

require("dotenv").config();
const chalk = require('chalk')
// const error = chalk.bold.red;
const log = console.log;
const keys = require("./keys");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
let inputCommand = process.argv[2];
let inputCommand2 = process.argv[3];

let spotify = new Spotify(keys.spotify);
//------------------

//function running
// app(process.argv[2], process.argv[3]);

//CHALK
//https://www.npmjs.com/package/chalk

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
            log(chalk.blue("LIRI doesn't know that command. Please try again."));
    }
}

//----------------GET BAND/CONCERT INFO
//band function for finding the bands and then console logging the name, location, and date of the show 
//WORKING RIGHT 
//command concert-this 
function getMyBand(artist) {
    // console.log("getMyBand() executed");
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

//-------SPOTIFY THIS 
//this is the function for finding spotify information and console logging it 
//THIS IS WORKING 
//command spotify-this-song 
    function getSpotify() {
        // console.log("getSpotify() executed");
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
       log(chalk.cyan("---------------------------------------------------------------------"));
       log(chalk.green("Artist: ") + chalk.blue(songdata.artistName));
       log(chalk.green("Song Name: ") + chalk.blue(songdata.songName));
       log(chalk.green("Preview Link: ") + chalk.blue(songdata.previewLink));
       log(chalk.green("Album: ") + chalk.blue(songdata.album));
       log(chalk.cyan("---------------------------------------------------------------------"));
    });
    
}

//--------GET MOVIE
//movie function for finding movie info, console logs Mr. Nobody if nothing is entered
//WORKS  
//command movie-this
function getMovie() {
    // console.log("getMovie() executed");
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

//---------DO WHAT IT SAYS
//this function takes info form the random.txt and does what it says, it will run one of the above functions depending on what's in the text file
//not working yet 
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
