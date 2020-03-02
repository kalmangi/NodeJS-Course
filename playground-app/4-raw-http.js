const https = require('https');
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/-120.5,47.5'

const request = https.request(url, (response)=>{
    let data = ''
    response.on('data',(chunk)=>{
        data = data + chunk.toString();
        console.log(data)
    })
    response.on('end',()=>{
        const body = JSON.parse(data);
        console.log(body)
    })

})

request.on('error',(error)=>{
    console.log('error',error)
})