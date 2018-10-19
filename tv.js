var request = require("request");
var fs = require("fs");
var TV = function() {
 var divider =
   "\n------------------------------------------------------------\n\n";

 this.findShow = function(show) {
   var URL = "http://api.tvmaze.com/singlesearch/shows?q=" + show;

   request(URL, function(err, response, body) {

     var jsonData = JSON.parse(body);
     var showData = [
       "Show: " + jsonData.name,
       "Genre(s): " + jsonData.genres.join(", "),
       "Rating: " + jsonData.rating.average,
       "Network: " + jsonData.network.name,
       "Summary: " + jsonData.summary
     ].join("\n\n");

     console.log(showData)
     fs.appendFile("log.txt", showData + divider, function(err) {
       if (err) throw err;
       console.log(showData);
     });
   });
 };

 this.findActor = function(actor) {
   var URL = "http://api.tvmaze.com/search/people?q=" + actor;

   request(URL, function(err, response, body) {
     // parse the response body (string) to a JSON object
     var jsonData = JSON.parse(body);

     // console.log(jsonData)

     let actorData = [
       'Name: ' + jsonData[0].person.name + "\n" +
       'Birthday: ' + jsonData[0].person.birthday + "\n" +
       'Gender: ' + jsonData[0].person.gender + "\n" +
       'Country: ' + jsonData[0].person.country.name + "\n" +
       'TV Maze URL: ' + jsonData[0].person.url
     ].join('\n\n')

     fs.appendFile("log.txt", actorData, function(err) {
       if (err) throw err;
       // console.log(showData);
     });

     console.log(actorData)
   })
 };
};

module.exports = TV;