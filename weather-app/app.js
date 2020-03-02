// console.log('starting')

// //async callbacks. These run only after main function completes.
// setTimeout(()=>{
//     console.log('set timer')
// }, 2000)

// setTimeout(()=>{
//     console.log('0 set timer')
// }, 0)


// console.log('stopping')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

if (!address) {
    console.log('Please provide an address')
} else {
    geocode(address, (error, { latitude, longitude, location }) => {
        if (error) {
            return console.log(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            console.log(location)
            console.log(latitude)
            console.log(forecastData)
        })
    })
}


// //const url = "https://api.darksky.net/forecast/27dfabc289e02068824b6707bbe3d9b6/37.8267,-122.4233";

// request({ url: url, json: true }, (error, response) => {
//     const latitude = response.body.features[0].geometry.coordinates[0];
//     const longitude = response.body.features[0].geometry.coordinates[1];
//     console.log(latitude, longitude);
// })

