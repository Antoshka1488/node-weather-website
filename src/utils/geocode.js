const request = require('postman-request');

function geocode(address, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW50b3Noa2ExNDg4IiwiYSI6ImNrcHlhdDN5YTBhZDEyeHQxeGc4Y2w0YTEifQ.19EfGH9mcMjjXcm4585SNw&language=en,ru&limit=1`;

  request({ url, json: true }, (error, response, { features }) => {
    if (error) {
      callback('Unable to connect to location services!');
    } else if (features.length === 0) {
      callback('Unable to find location. Try another search.');
    } else {
      let [ longitude, latitude ] = features[0].center;
      callback(undefined, { 
        longitude, 
        latitude, 
        location: features[0].place_name 
      });
    }
  });
};

module.exports = geocode;