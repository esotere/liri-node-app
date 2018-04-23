let [, , ...input] = process.argv;
let rd = require("dotenv").config();
const keys = require("./keys.js")
const fs = require("fs");
let Spotify = require('node-spotify-api');
let request = require('request');


function rec() {
    // Note to self; Make sure to ask why I had to write the logic backward to work**
    let log = "";
    if (!input.indexOf("spotify-this-song") || !input.indexOf("do-what-it-says")) {
        log = "random.txt"
    } else if (!input.indexOf("movie-this")) {
        log = "movieList.txt"
    }
    fs.appendFile(log, ", " + "\n" +input[1], function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("Text file updated")
    })
}
// let client = new Twitter(keys.twitter);

function spotifySong() {
    // spotify.find({ search: search, artist: artist}, function(err, result) {
    //     console.log(err)
    // }); console.log(result) 
    let spotify = new Spotify(keys.spotify);
    let songName = process.argv[3]
    //note to self; remember limit is optional
    spotify.search({
        type: "track",
        query: songName,
        limit: 10
    }, function (err, data) {
        if (err) {
            return console.error("Error occurred: " + err);
        }
        // console.log(data); 
        let tune = data.tracks.items;

        // for (let key in spotify) {
        //     console.log("Artist(s): " + tune[i].artists[0].name);
        //   }
        for (let i = 0; i < tune.length; i++) {
            console.log("================================================");
            console.log("Artist(s): " + tune[i].artists[0].name);
            console.log("Song Title: " + tune[i].name);
            console.log("Album: " + tune[i].album.name);
            console.log("Preview Link: " + tune[i].preview_url);
            console.log("================================================");
        }
    });

}

function movie() {
                //note to self; find out why using my key throws an error as opposed to trilogy**
         //let omdb = new request(keys.omdb)

    let movieName = process.argv[3];
    for (let i = 2; i < input.length; i++) {

        if (i > 2 && i < input.length) {

            movieName = movieName + "+" + input[i];

        } else {
            movieName += input[i];
        }
    }
   // let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + omdb;
    //let queryUrl2 = "http://www.omdbapi.com/?apikey=" + omdb + "&t=" + '"' + movieName + '"'
    //let queryUrl3 = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=` + omdb
    // console.log(queryUrl);
    // console.log(queryUrl2);

    request(`http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("=============================================================");
            console.log("Title: " + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nThe movie's rating is: " + JSON.parse(body).imdbRating + "\nThe movie's plot is: " + JSON.parse(body).Plot);
            console.log(movie.title, movie.year, movie.rating, movie.plot);
             let rottenTomatoes = JSON.parse(body).Ratings[1];
                console.log("Rotten Tomatoes Rating: " + JSON.stringify(rottenTomatoes.Value));
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            console.log("=============================================================");

        } else if (error) {
            console.log(error)
        }
        //console.log(response)
    });
}
//  function movie() {
//         let movie = ""
//          request(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`, function(error, response, body) {

//         ``    
//     "https//:myurl.com?movie=" + movie + 'rest of the url'
//     //   request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

//    if (!error && response.statusCode === 200) {

//     // Parse the body of the site and recover just the imdbRating
//     console.log("Release Year: " + JSON.parse(body).Year + " The movie's rating is: " + JSON.parse(body).imdbRating);
// }
//  //}); 
//   //console.log(response)

// }); 
//  }
function doThis() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.error(err);
        }
        //console.log(data); 
        // Break the string down by comma separation and store the contents into the output array.
        let output = data.split("\n");
        let arrange = [];
        let play = [];
        // // Loop Through the newly created output array
        for (let i = 0; i < output.length; i++) {
            play = output[Math.floor(Math.random() * output.length)]

            arrange.push(play)
            // Print each element (item) of the array/
            // console.log(arrange[0]);
        }
        console.log(arrange[1]);
        // console.log(output);

    });
    // console.log(data)

}

function home() {
    console.log("Sleeping")
}



// console.log();

// spotify.search({ type: 'track', query: 'mr nobody' })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

switch (input[0].toString()) {
    //    case "my-tweets":
    //             tweets(); 
    //             rec();
    //             break;

    case "spotify-this-song":
        spotifySong();
        rec();
        break;

    case "movie-this":
        movie();
        rec();
        break;

    case "do-what-it-says":
        doThis();
        //rec();
        break;

    default:
        rec();
        home();
        break;

}