const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
    brand_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'brand'

    },
    model_name:{
        type : String,
        required: true
    },
    model_slug:{
        type: String,
    },
    status:{
        type: Number,
        default : 1
    }   
},
{timestamps:true}
)

module.exports = mongoose.model("model",modelSchema)