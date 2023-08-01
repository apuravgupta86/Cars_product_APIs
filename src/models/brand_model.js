const mongoose = require('mongoose')


const brandSchema = new mongoose.Schema({
    brand_name:{
        type: String,
        required: true
    },
    brand_slug:{
        type: String
        
    },
    status:{
         type: Number,
         default : 1
    },
},
{timestamps:true}
)



module.exports = mongoose.model("brand", brandSchema)