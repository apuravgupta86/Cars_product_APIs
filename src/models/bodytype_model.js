const mongoose = require('mongoose')


const bodySchema = new mongoose.Schema({
    body_type:{
        type: String,
        required: true
    },
    body_slug:{
        type: String
        
    },
    status:{
         type: Number,
         default : 1
    },
},
{timestamps:true}
)



module.exports = mongoose.model("body_type", bodySchema)