var [,,...input] = process.argv; 
var rd      = require("dotenv").config();
var keys    = require("./keys.js")
var fs      = require("fs");
var Spotify = require('node-spotify-api');
var request = require('request');



// var client = new Twitter(keys.twitter);

function spotifySong() {
    // spotify.find({ search: search, artist: artist}, function(err, result) {
    //     console.log(err)
    // }); console.log(result) 
    var spotify = new Spotify(keys.spotify); 
                                      //note to self; remember limit is optional
    spotify.search({ type: 'track', query: 'selassie soldier', limit: 10 }, function(err, data) {
        if (err) {
            return console.error('Error occurred: ' + err);
        } 
    console.log(data); 
    });
    // for (var key in spotify) {
    //     console.log();
    //   }
}

function movie() {

    var movieName = "";
    for (var i = 2; i < input.length; i++) {

        if (i > 2 && i < input.length) {

             movieName = movieName + "+" + input[i];

        } else {
            movieName += input[i];
            }
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        console.log(queryUrl);

    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
        console.log("Release Year: " + JSON.parse(body).Year + " The movie's rating is: " + JSON.parse(body).imdbRating);
         console.log( movie.title, movie.year, movie.rating);
         console.log(movie.plot);
        }
    });
}
//  function movie() {
//         var movie = ""
//          request(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`, function(error, response, body) {

//         ``    
//     "https//:myurl.com?movie=" + movie + 'rest of the url'
//     //   request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

//    if (!error && response.statusCode === 200) {

//     // Parse the body of the site and recover just the imdbRating
//     console.log("Release Year: " + JSON.parse(body).Year + " The movie's rating is: " + JSON.parse(body).imdbRating);
// }
//  //}); 
//   console.log(response)
   
// }); 
//  }
function doThis() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.error(err);
         } 
         //console.log(data); 
    // Break the string down by comma separation and store the contents into the output array.
        var output = data.split(",");
        var arrange = [];
        var play = [];  
    // // Loop Through the newly created output array
        for (var i = 0; i < output.length; i++) {
            play = output[(Math.floor(Math.random() * output.length) == 0)]
           
            arrange.push(play)
      // Print each element (item) of the array/
           // console.log(arrange[0]);
            }
         console.log(arrange[0]);
        console.log(output);

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
 
  switch(input[0].toString()) {
    //    case "my-tweets":
    //             tweets();
    //             break;

       case "spotify-this-song":
                spotifySong();
                break;
      
       case "movie-this":
                movie();
                break;
      
       case "do-what-it-says":
                doThis();
                break;

       default:
                home();
                break;
      
  }