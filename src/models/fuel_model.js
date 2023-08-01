const mongoose = require('mongoose')


const fuelSchema = new mongoose.Schema({
    fuel_type:{
        type: String,
        required: true
    },
    fuel_slug:{
        type: String
        
    },
    status:{
         type: Number,
         default : 1
    },
},
{timestamps:true}
)



module.exports = mongoose.model("fuel", fuelSchema)