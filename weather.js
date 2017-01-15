/**
 * Created by IbrahimShaikh on 1/15/17.
 *
 * Command line weather application that takes in a US zip code as its input and returns the weather for that zip code.
 */

var https = require("https");
var http = require("http");

var latitude = "";
var longitude = "";
var zip = "95757";


//Use the Google Maps API to get the longitude and latitude of the zip code
var res = http.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + zip, function (req) {

    //variable holding the body of the req
    var body = "";

    //req data event
    req.on('data', function (chunk) {
        //concatonate the chunks of data to the body
        body += chunk;
    });

    //req end event
    req.on('end', function (chunk) {
        //parse the information and assign it to the appropriate variables
        var data = JSON.parse(body);

        latitude = data.results[0].geometry.location.lat;
        longitude = data.results[0].geometry.location.lng;

        console.log("Latitude: " + latitude + "\nLongitude: " + longitude);
    });

})