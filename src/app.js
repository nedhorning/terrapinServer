const express = require('express')
const mongoose = require('mongoose')
const TrackerData = require('./models/trackerData')

const app = express()
const port = process.env.PORT

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
}) 

app.use(express.json())

app.post('/data', (req, res) => {
    const data = req.body
    console.log(data);
    if (data.object.gpsLocation[1].latitude) {  // If there is a node GPS location write to the database
        const trackerData = new TrackerData({
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
        
        trackerData.save().then(() => {
            console.log(trackerData)
        }).catch((error) => {
            console.log('Error', error)
        })
    }
});

app.listen(port, () => {
    console.log('Server is up on port ' + port)
    app.get('/data', (req, res) => {
        res.send('Server is up and running')
    })
}) 

