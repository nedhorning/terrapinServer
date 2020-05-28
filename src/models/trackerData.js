const mongoose = require('mongoose')

const trackerDataSchema = new mongoose.Schema({
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
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
    isHighTide: {
        type: Boolean
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

const TrackerData = mongoose.model('TrackerData', trackerDataSchema)

module.exports = TrackerData