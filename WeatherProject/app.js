const express = require("express");
const https = require("https");
const app = express();
var lat;
var long
// const bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());


//  Step 1 : User sent me a get request
app.get("/", function(req, res) {
  // Step2: User gets index file documents
  res.sendFile(__dirname + "/index.html");
});


// Step 3: Users sent me a post request at '/api' and I deposit the users location data.
app.post("/api", function(req, res) {
  lat = req.body.latitude;
  long = req.body.longitude;
});

//Step 4: Users sent me an aother post request and I procceed further
app.post("/", function(req, res) {

  // Step 5: I convert that post  request to http request and then send it to the external server using Api
  const apiKey = "db5b00d170d71e5082e5debb0ba76a5a";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?units=" + unit + "&appid=" + apiKey + "&lat=" + lat + "&lon=" + long;
  https.get(url, function(response) {
    // I recive the data or json object
    // console.log(response.statusCode);

    // Step 6: Here external server send me some data back and I save the data in chunk variable
    response.on('data', function(chunk) {

      // Step 7: I convert the chunk variable dada to my desired form
      const weatherData = JSON.parse(chunk);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const cityName = weatherData.name;
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";


      console.log("temperature = " + temp);

      // step 8: I send the final data to the Users
      res.write("<p>The weather is currently " + description + "</p>");
      res.write("<h1>Temperature in " + cityName + " is " + temp + " degrees celcius </h1>");
      res.write("<img src='" + imageUrl + "'>");
      res.send();

    });
  });

});

// Step 0 open a port to receive request
app.listen(3000, function() {
  console.log("Server opened");
});
