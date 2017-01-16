/**
 * Created by IbrahimShaikh on 1/15/17.
 *
 * This is an API for the DarkSky service to get weather information.
 */
var http = require("http");
var https = require("https");


function get(longitude, latitude, cityName, stateName) {

    var res = https.get("https://api.darksky.net/forecast/50a7cc7a9e2060825fe6491413906f2b/" + latitude + "," + longitude, function (req) {
        //variable holding the body of the req
        var body = "";

        //req data event
        req.on('data', function (chunk) {
            //concatonate the chunks of data to the body
            body += chunk;
        });

        //req end event
        req.on('end', function () {
            //parse the information in the body
            var data = JSON.parse(body);

            var currentTemp = data.currently.temperature;
            var weatherCond = data.currently.summary;

            console.log(
                "Weather in " + cityName + ", " + stateName +
                "\nCurrent temperature: " + currentTemp +
                "\nCurrent Weather Condition: " + weatherCond
            );

        });
    });
};

module.exports.get = get;