const express = require('express')
//const mongodb = require('mongodb')
const mongoose = require('mongoose')
// const MongoClient = mongodb.MongoClient
// const connectionURL = 'mongodb://127.0.0.1:27017'
// const databaseName = 'tracker-test'

const app = express()
const port = process.env.PORT || 3000

mongoose.connect('mongodb://127.0.0.1:27017/tracker-test', {
    useNewUrlParser: true,
    useCreateIndex: true
}) 

const TrackerData = mongoose.model('TrackerData', {
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
        type: String
    },
    deviceEUI: {
        type: String
    },
    rssi: {
        type: Number
    }
})

// MongoClient.connect(connectionURL,  { useNewUrlParser: true },  (error, client) => {
//     if (error) {
//         return console.log('Unable to connect to database')
//     }
//     const db = client.db(databaseName)   
// })

app.use(express.json())

app.post('/data', (req, res) => {
    const data = req.body
    console.log(data);
    const sampleData = new TrackerData({
        latitude: data.object.gpsLocation[1].latitude,
        longitude: data.object.gpsLocation[1].longitude,
        altitude: data.object.gpsLocation[1].altitude,
        epe: data.object.analogInput[2],
        timeToFix: data.object.analogInput[3],
        isFreshGPS: data.object.digitalInput[4],
        isHighTide: data.object.digitalInput[5],
        deviceName: data.deviceName,
        deviceEUI: data.devEUI,
        packageTime: data.rxInfo[0].time,     
        rssi: data.rxInfo[0].rssi    
    })
    
    sampleData.save().then(() => {
        console.log(sampleData)
    }).catch((error) => {
        console.log('Error', error)
    })

    // db.collection('trackerData').insertOne({
    //     applicationName: data.applicationName,
    //     deviceName: data.deviceName,
    //     devEUI: data.devEUI,
    //     time: data.rxInfo[0].time
    // })
     
    // app.get('/data', (req, res) => {
    //     res.send({
    //         applicationName: data.applicationName,
    //         deviceName: data.deviceName,
    //         devEUI: data.devEUI,
    //         time: data.rxInfo[0].time
    //     })
    // })
});

app.listen(port, () => {
    console.log('Server is up on port ' + port)
}) 

