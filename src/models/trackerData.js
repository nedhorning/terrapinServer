const mongoose = require('mongoose')

const trackerDataSchema = new mongoose.Schema({
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    location: {
        type: JSON
    },
    altitude: {
        type: Number
    },
    epe: {
        type: Number
    },
    timeToFix: {
        type: Number
    },
    isFreshGPS: {
        type: Boolean
    },
    gpsTime: {
        type: Number
    },
    vbat: {
        type: Number
    },
    temp: {
        type: Number
    },
    resetCounter: {
        type: Number
    },
    deviceName: {
        type: String
    },
    packageTime: {
        type: Date
    },
    deviceEUI: {
        type: String
    },
    rssi: {
        type: Number
    }
})

<<<<<<< HEAD
const TrackerData = mongoose.model('BlandingsData', trackerDataSchema)  // String in quotes is collection name in mongoDB
=======
const TrackerData = mongoose.model('KiawahIsland2021', trackerDataSchema)  // String in quotes is collection name in mongoDB
>>>>>>> f33b56283d25de6bb84e03692b6ab4416d3fba43

module.exports = TrackerData