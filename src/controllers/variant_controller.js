const variant_model = require('../models/variant_model')
const models_model = require('../models/models_model')
const brand_model = require('../models/brand_model')


const addVariant = async(req,res)=>{
    try{
        const formerror = {}
     if(req.body.variant_name === undefined)
     {
        formerror.variant_name = "Variant name is required"
     }
    if(Object.keys(formerror).length !== 0 )
     {
        return res.send(formerror)
     }
     const getVariants ={
        brand_id:req.body.brand_id,
        model_id:req.body.model_id,
        variant_name:req.body.variant_name,
        variant_slug:req.body.variant_name.toLowerCase().replace(/ /g, "-")
     }
     
     const existingVariants = await variant_model.findOne({variants_name:getVariants.variant_name,variant_slug:getVariants.variant_slug})
     if(existingVariants)
     {
        return res.send("Variant is already added")
     }
     const variants = await variant_model(getVariants)
     await variants.save()
     res.send(variants)
    }
    catch(error)
    {
        return res.send("Something went wrong")
    }
}


const updateVariant = async(req,res)=>{
    try{
      const variants = await variant_model.findById(req.params.id)
      if(req.body.variant_name)
      {
        variants.variant_name = req.body.variant_name
      }
      if(req.body.variant_slug)
      {
        variants.variant_slug = req.body.variant_slug.toLowerCase().replace(/ /g, "-")
      }
      else {
        variants.variant_slug
      }
      if(req.body.brand_id)
      {
        variants.brand_id = req.body.brand_id
      }
      if(req.body.variant_id)
      {
        variants.variant_id = req.body.variant_id
      }

      await variants.save()
      res.send(`${variants} is updated successfully`)

    }
    catch(error)
    {
        return res.send("Something went wrong")
    }
}


const read_all_variants = async(req,res)=>{
    try{
        const variants = await variant_model.find().populate([
            {path:"brand_id", select:['brand_name']}
        ]).populate([{path:"model_id", select:['model_name']}])
        
        if(!variants)
        {
            return res.send("Variants not found")
        }
        res.send(variants)

    }
    catch(error)
    {
        return res.send(error)
    }
}


const read_all_models = async(req,res)=>{
    try{
        const models = await models_model.find().populate([
            {path:"brand_id", select:['brand_name']}
        ])
        
        if(!models)
        {
            return res.send("Cannot find models")
        }
        res.send(models)

    }
    catch(error)
    {
        return res.send("Something went wrong")
    }
}


const read_all_brands = async (req, res) => {
    try {
      const brands = await brand_model.find().where({status:1});
      if (!brands) {
        return res.send("No brands found");
      }
      res.send(brands);
    } catch (error) {
      re.send("Something went wrong");
    }
  };



const read_variant_by_id = async(req,res) => {
    try{
        const variants = await variant_model.findById(req.params.id)
        if(!variants)
        {
            return res.send("Id not found")
        }
        res.send(variants)

    }
    catch(error)
    {
        return res.send("Something went wrong")
    }
}



const inactive_variants = async(req,res)=>{
    try{
        const variants = await variant_model.findById(req.params.id)
        if(!variants)
        {
          return res.send("Id not found")
        }
        variants.status = req.body.status
        let statusType = ''
        if(variants.status === 1)
        {
         statusType = "Active"
        }
        else if(variants.status === 2)
        {
          statusType = "Inactive"
        }

        await variants.save()
        res.send(statusType)

    }
    catch(error)
    {
        return res.send("Something went wrong")
    }
}


module.exports ={addVariant,updateVariant,read_all_variants,read_all_models,read_all_brands,read_variant_by_id,inactive_variants}