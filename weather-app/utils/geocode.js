const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYWlzaHdhcnlha2siLCJhIjoiY2s3MzV3OGcwMDh4azNoanRvbWRhbnF4OSJ9.qSZP_drkBXxeQD2-IjJyYQ&limit=1'

    request({ url, json: true }, (error, { body }) => {
        console.log(url)
        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
    })
}
    
module.exports = geocode