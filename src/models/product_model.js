const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    brand_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'brand'
    },
    model_id:{
         type: mongoose.Schema.Types.ObjectId,
         ref:'model'
    },
    variant_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'variant'
   },
    product_name:{
        type: String,
        required:true
    },
    product_slug:{
        type: String
        
    },
    registration_year:{
        type:Number ,
        required:true
     },
     registration_state:{
        type:String ,
        required:true
     },
     kms_driven:{
         type:Number,
         required:true
     },
     ownership:{
          type:String,
          required:true
     },
    status:{
        type:Number,
        default:1
    },
    fuel_type:{
        type:String,
        required:true
   },
  price:{
      type:Number,
      required:true
  },
  body_type:{
    type:String,
    required:true
  }
},
{timestamps:true}
)

module.exports = mongoose.model("product",productSchema)