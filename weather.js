/**
 * Created by IbrahimShaikh on 1/15/17.
 *
 * Command line weather application that takes in a US zip code as its input and returns the weather for that zip code.
 */

var https = require("https");
var http = require("http");
var darkSky = require("./DarkSkyAPI");

var latitude = "";
var longitude = "";
var zip = process.argv[2];
var cityName = "";
var stateName = "";


//Use the Google Maps API to get the longitude and latitude of the zip code
var mapRes = http.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + zip, function (req) {

    //variable holding the body of the req
    var body = "";

    //req data event
    req.on('data', function (chunk) {
        //concatonate the chunks of data to the body
        body += chunk;
    });

    //req end event
    req.on('end', function () {
        //parse the information
        try {
            var data = JSON.parse(body);


            //assign the data to the appropriate variables
            latitude = data.results[0].geometry.location.lat;
            longitude = data.results[0].geometry.location.lng;
            cityName = data.results[0].address_components[1].long_name;
            stateName = data.results[0].address_components[3].short_name;
        }catch (e){
            console.error("Not a real zip code...please retry.");
            process.exit();
        };


        //console.log("Latitude: " + latitude + "\nLongitude: " + longitude);

        darkSky.get(longitude,latitude, cityName, stateName);
    });

});




