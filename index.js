const express = require("express");
const axios = require("axios");
require("dotenv").config();
const app = express();
const API_KEY = process.env.API_KEY;
const port = 3033;
app.get("/", function (req, res) {
  // Define a route for the root path of the application
  //   res.send("Hello World!");
  const address = req.query.address;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${API_KEY}`;
  // Make an HTTP GET request to the API using axios
  axios
    .get(url)
    .then((response) => {
      const data = response.data;
      const cityName = data.name;
      const temperature = data.main.temp;
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
      const message = `City Name: ${cityName}<br>Temperature: ${temperature}&deg;C<br>Sunset Time: ${sunsetTime}`;
      res.send(
        `<html><body><div id='container'><h1>${message}</h1></div></body></html>`
      );
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred while fetching weather data");
    });
});
//Starting the server and listening on the specified port
app.listen(port, function () {
  console.log(`Application is running on ${port}`);
});
