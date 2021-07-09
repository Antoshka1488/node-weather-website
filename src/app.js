const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, '..', 'templates', 'views');
const partialsPath = path.join(__dirname, '..', 'templates', 'partials');

// Setup handlebars engine nad views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', { 
    title: 'Weather App',
    name: 'Andrew Mead' 
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Andrew Mead'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'Example message',
    name: 'Andrew Mead'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send({
      error: 'You must provide an address!'
    });
    return;
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      res.send({
        error
      });
      return;
    }
    
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        res.send({
          error
        });
        return;
      }
      
      res.send({
        location,
        forecast: forecastData,
        address: req.query.address
      });
    });
  });
});

// app.get('/products', (req, res) => {
//   if (!req.query.search) {
//     res.send({
//       error: 'You must provide a search term'
//     });
//     return;
//   }

//   console.log(req.query.search);
//   res.send({
//     products: []
//   });
// });

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404',
    name: 'Andrew Mead',
    errorText: 'Help article not found.'
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: '404',
    name: 'Andrew Mead',
    errorText: 'Page not found.'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000!');
});