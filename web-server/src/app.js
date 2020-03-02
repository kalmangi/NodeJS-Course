const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const app = express();
const forecast = require('../utils/forecast');
const geocode = require('../utils/geocode');

console.log(__dirname);

//Define paths for Express config
const pathD = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//set up handlebars engine and views location
app.set('view engine','hbs');//This is to set up the value. Need to be set exactly.
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);//To register partials

//set up static directory to serve
app.use(express.static(pathD));

app.get('/', (req, res) => {
    res.render('index',{
        title:'Weatherr',
        name: 'name'//This value is provided by node to the template.
    });//allow to render one of the views
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'This is title',
        name: 'This is name'//This value is provided by node to the template.
    });//allow to render one of the views
})


app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'error'
        })
        
    }//if no return it will give JS error in terminal when there is no search provided in query
    console.log(req.query)
    res.send({
        product: []
    });//allow to render one of the views
})

app.get('/help', (req, res) => {
    res.render('help',{helpText: 'Help title'}  
    )
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title:'Help article not found',    
    }
)
});
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Address is required'
        })
    }
    console.log(req)
    
        geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
            if (error) {
                return res.send({error})
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                
                res.send({
                    location: location,
                    latitude: latitude,
                    location,
                    longitude: longitude,
                    forecast: forecastData,
                    address: req.query.address
                })
                console.log(location)
                console.log(latitude)
                console.log(forecastData);
                // forecast:'It is snowing',
                // address: req.query.address,
            })
        })
     
})

app.get('*', (req, res) => {
    res.render('404',{
        title:'This page does not exist',    
    }
)
});
app.listen(3001, () => {
    console.log('server is up on port 3001')
})