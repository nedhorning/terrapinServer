const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs')
const TrackerData = require('./models/trackerData')

const app = express()
const port = process.env.PORT

//var date = new Date();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
}) 

app.use(express.json())

fs.writeFileSync('test.txt', '')
app.post('/data', (req, res) => {
    const data = req.body
    console.log(data);
    if (data.object.latitude) {  // If there is a node GPS location write to the database
        const trackerData = new TrackerData({
            //latitude: data.object.gpsLocation[1].latitude,
            //longitude: data.object.gpsLocation[1].longitude,
            location: {type: "Point", coordinates: [data.object.longitude, data.object.latitude]},
            altitude: data.object.altitude,
            epe: data.object.epe,
            timeToFix: data.object.timeToFix,
            isFreshGPS: data.object.freshGPS,
            isHighTide: data.object.isHighTide,
            gpsTime: data.object.time,
            vbat: data.object.vbat,
            deviceName: data.deviceName,
            deviceEUI: data.devEUI,
            packageTime: data.rxInfo[0].time, 
            //packageTime: date.getTime(),    
            rssi: data.rxInfo[0].rssi    
        })
        
        trackerData.save().then(() => {
            console.log(trackerData)
        }).catch((error) => {
            console.log('Error', error)
        })
        fs.appendFile('test.txt', trackerData, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
    }
});

app.listen(port, () => {
    console.log('Server is up on port ' + port)
    app.get('/data', (req, res) => {
        res.send('Server is up and running')
    })
}) 

