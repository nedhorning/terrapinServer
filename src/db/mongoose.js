const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/tracker-test3', {
    useNewUrlParser: true,
    useCreateIndex: true
}) 

const TrackerData = mongoose.model('TrackerData', {
    // applicationName: {
    //     type: String
    // },
    // deviceName: {
    //     type: String
    // },
    // time: {
    //     type: String
    // }
})

const sampleData = new TrackerData({
    applicationName: 'testApplication',
    deviceName: 'deviceNameIsGnat',
    time: '2020-05-26T18:52:19.306775Z'

})

sampleData.save().then(() => {
    console.log(sampleData)
}).catch((error) => {
    console.log('Error', error)
})
