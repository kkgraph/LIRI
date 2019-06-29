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
let commands = process.argv[2];
let paramater = process.argv[3];

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
    var artist = paramater;
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response) {
        for(var i = 0; i < response.data.length; i++) {
        var show = {
            name: response.data[i].venue.name,
            location: response.data[i].venue.city + ", " + response.data[i].venue.country,
            date: moment(response.data[i].datetime).format('MM-DD-YYYY')
        };
        log(chalk.cyan("("+(i+1)+")" + "------------------------------------------------------------------"));
        log(chalk.green("Name of Venue: ") + chalk.blue(show.name));
        log(chalk.green("Location: ") + chalk.blue(show.location));
        log(chalk.green("Date of Event: ") + chalk.blue(show.date));
        log(chalk.cyan("---------------------------------------------------------------------"));
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
        var track = paramater;
        var randomtrackSplit = [ ];
        if (track === undefined) {
            track = "'The Sign'";
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
    var movieTitle = paramater;
    if (movieTitle === undefined) {
        movieTitle = "Mr Nobody";
      }
      var urlHit =
        "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=full&tomatoes=true&apikey=trilogy";
        //apikey=trilogy
    
      axios.get(urlHit).then(
        function(response) {
          var jsonData = response.data;
    
          log(chalk.cyan("---------------------------------------------------------------------"));
          log(chalk.green("Title: ") + chalk.blue(jsonData.Title));
          log(chalk.green("Year: ") + chalk.blue(jsonData.Year));
          log(chalk.green("Rated: ") + chalk.blue(jsonData.Rated));
          log(chalk.green("IMDB Rating: ") + chalk.blue(jsonData.imdbRating));
          log(chalk.green("Country: ") + chalk.blue(jsonData.Country));
          log(chalk.green("Language: ") + chalk.blue(jsonData.Language));
          log(chalk.green("Plot: ") + chalk.blue(jsonData.Plot));
          log(chalk.green("Actors: ") + chalk.blue(jsonData.Actors));
          log(chalk.green("Rotten Tomatoes Rating: ") + chalk.blue(jsonData.Ratings[1].Value));
          log(chalk.cyan("---------------------------------------------------------------------"));
        }
      );
}

//---------DO WHAT IT SAYS
//this function takes info form the random.txt and does what it says, it will run one of the above functions depending on what's in the text file
//not working yet 
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        // log(chalk.bgGreen(data));
    
        const dataArr = data.split(",");

        for (var i = 0; i < dataArr.length; i++) {
          // console.log(dataArr);
          commands = dataArr[i]; i++;
          // console.log(command);
          paramater = dataArr[i];
          // console.log(paramaters);
          log(chalk.yellow(commands, paramater));

          App(commands, paramater);
           };
      })
};

//------------
function App(commands, paramater) {
  switch (commands) {
    case "concert-this":
        getMyBand(paramater);
        break;
    case "spotify-this-song":
        getSpotify(paramater);
        break;
    case "movie-this":
        getMovie(paramater);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
  } 
};

App(commands, paramater);