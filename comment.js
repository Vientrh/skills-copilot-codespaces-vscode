//Create web server
// 1. Create a web server
// 2. Create a route
// 3. Create a route handler
// 4. Send back HTML
// 5. Test your work

// 1. Create a web server
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//Setup route
app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Gaurav'
    });
});

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Gaurav'
    });
});

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        message: 'This is a help message',
        name: 'Gaurav'
    });
});

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    } else {
        geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
            if(error){
                return res.send({error});
            }
            forecast(latitude,longitude,(error,forecastData) => {
                if(error){
                    return res.send({error});
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                });
            });
        });
    }
});

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        message: 'Help article not found',
        name: 'Gaurav'
    });
});

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        message: 'Page not found',
        name: 'Gaurav'
    });
});
