const mongoose = require('mongoose')

const connection = mongoose.connect(`mongodb://127.0.0.1:27017/Luxury_ride`, {useNewUrlParser: true})
.then(()=>{
    console.log("Connected to database")
})
.catch(()=>{
    console.log("Not connected to database")
})


module.exports = connection