require("dotenv").config();
const keys = require("./keys");
const Spotify = require("node-spotify-api");
const axois = require("axios");
const moment = require("moment");
const fs = require("fs");

let spotify = new Spotify(keys.spotify);
//------------------

//function running
app(process.argv[2], process.argv[3]);

//------------------

function app(command, paramaters) {
    switch (command) {
        case "concert-this":
            getMyBand(paramaters);
            break;
    
        // case "spotify-this-song":
        //     getSpotify(paramaters);
        //     break;
    
        // case "movie-this":
        //     getMovie(paramaters);
        //     break;

        // case "do-what-it-says":
        //     doWhatItSays();
        //     break;
    
        default: 
            console.log("LIRI doesn't know that command. Please try again.");
    }
}

//----------------

function getMyBand(artist) {
    let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(function (respond) {
        let data = respond.data;
        console.log(data);

    })
}