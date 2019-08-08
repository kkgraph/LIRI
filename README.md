# LIRI
This LIRI app can find out the next time and location your favorite band is playing, where you can listen to your favorite song, and information about any movie you're curious about. 

## Organized 
LIRI is organized in four functions:
### getBand
This grabs band information from bandsintown. Once you enter a band, like 'Halsey', it returns the band's next shows, locations, and time.

### getMovie
This function uses OMBD and grabs information about the movie you requested and returns Title, Year, Rating, IMBD rating, country, language, plot, actors, and rotten tomato ratting. 

### getSong
This function uses Spotify to grab information on songs. It tells you the artist, the song title, a preview link for the song, and the album the song is from. 

### doWhatItSays
This function takes what is being said in the random.txt and runs one of the above functions.

## How to use it 

You can find more information about the song of your choice by running:
> node liri.js. spotify-this-song '<song-title>'

You can find more information about the movie of your choice by running:
> node liri.js movie-this '<movie-title>'

You can find more information on the next band performance of your choice by running:
> node liri.js concert-this '<artist-name>'

And finally, you can enter one of the above commands into the random.txt file and run the command in node by:
> node liri.js do-what-it-says

## Screenshot
screenshot:
 ![Screenshot](/screenshot.png)

## Deployed Link 
You can find version 1.0 of the app here: https://github.com/kkgraph/LIRI

## Technology used
* Javascript
* JSON
* AXOIS
* CHALK 
* Node.js

## Author
* **Kim Graff** - [Kim Graff](https://github.com/kkgraph)
