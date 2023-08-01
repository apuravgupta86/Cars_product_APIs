const mongoose = require('mongoose')

const variantSchema = new mongoose.Schema({
    brand_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'brand'
    },
    model_id:{
         type: mongoose.Schema.Types.ObjectId,
         ref:'model'
    },
    variant_name:{
        type: String,
        required:true
    },
    variant_slug:{
        type: String
    },
    status:{
        type:Number,
        default:1
    }
},
{timestamps:true}
)

module.exports = mongoose.model("variant",variantSchema)