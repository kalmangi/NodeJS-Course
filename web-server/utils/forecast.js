
 const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/27dfabc289e02068824b6707bbe3d9b6/' + latitude + ',' + longitude
    request({ url: url, json: true }, (error, {body}) => {
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        //console.log(url
    })
}

module.exports = forecast;