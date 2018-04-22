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
    let songName = process.argv[3] 
                                      //note to self; remember limit is optional
    spotify.search({ type: "track", query: songName, limit: 10 }, function(err, data) {
        if (err) {
            return console.error("Error occurred: " + err);
        } 
   // console.log(data); 
        var tune = data.tracks.items;

    // for (var key in spotify) {
    //     console.log("Artist(s): " + tune[i].artists[0].name);
    //   }
    for (var i = 0; i < tune.length; i++) {
      console.log("Artist(s): " + tune[i].artists[0].name);
      console.log("Song Title: " + tune[i].name);
      console.log("Album: " + tune[i].album.name);
      console.log("Preview Link: " + tune[i].preview_url);
      console.log("================================================");
    }
    });

}

function movie() {

    var movieName = process.argv[3] ;
    for (var i = 2; i < input.length; i++) {

        if (i > 2 && i < input.length) {

             movieName = movieName + "+" + input[i];

        } else {
            movieName += input[i];
            }
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    var queryUrl2 = "http://www.omdbapi.com/?apikey=trilogy&t=" + '"' + movieName + '"' 
        console.log(queryUrl);
        console.log(queryUrl2);

    request(queryUrl2, function(error, response, body) {
        if (!error && response.statusCode === 200) {
         console.log("Title: " + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nThe movie's rating is: " + JSON.parse(body).imdbRating);
         console.log( movie.title, movie.year, movie.rating);
         console.log(movie.plot);
        //  let rottenTomatoes = JSON.parse(body).Ratings[1];
        //     console.log("Rotten Tomatoes Rating: " + JSON.stringify(rottenTomatoes.Value));
        //     console.log("Country: " + JSON.parse(body).Country);
        //     console.log("Language: " + JSON.parse(body).Language);
        //     console.log("Plot: " + JSON.parse(body).Plot);
        //     console.log("Actors: " + JSON.parse(body).Actors);
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
//   //console.log(response)
   
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