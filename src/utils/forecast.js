const request = require('postman-request');

function forecast(latitude, longitude, callback) {
  const url = `http://api.weatherstack.com/current?access_key=cc1a288efe604dda84cd53d76c9d4da3&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to weather service.');
    } else if (body.error) {
      callback('Unable to find location.');
    } else {
      callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}.`);
    };
  });
};

module.exports = forecast;