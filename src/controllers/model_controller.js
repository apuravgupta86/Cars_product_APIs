const mongoose = require('mongoose')
const models_model = require('../models/models_model')
const brand_model = require('../models/brand_model')



const addModel = async(req,res)=>{
    try{
        const formerror = {}
     if(req.body.model_name === undefined)
     {
       formerror.model_name = "Model name is required"
     }
     if(Object.keys(formerror).length !== 0)
     {
        return res.send(formerror)
     }
     
     const getModels ={
        model_name : req.body.model_name,
        model_slug: req.body.model_name.toLowerCase().replace(/ /g, "-"),
        brand_id: req.body.brand_id
     }

     const existingModel_slug = await models_model.findOne({model_name:getModels.model_name,model_slug:getModels.model_slug})
     if(existingModel_slug)
     {
         return res.send(`${existingModel_slug.model_slug} is already added`)
     }

     const models = new models_model(getModels)
     await models.save()
     res.send(models)


    }
    catch(error)
    {
        res.send("Something went wrong . Models not created")
        console.log(error)
    }
}


const updateModel = async(req,res)=>{
    try{
        const models = await models_model.findById(req.params.id)

        if(req.body.model_name)
        {
            models.model_name = req.body.model_name
        }
        if(req.body.model_slug)
        {
            models.model_slug = req.body.model_slug.toLowerCase().replace(/ /g, "-")
        } else {
            models.model_slug
        }
        models.brand_id = req.body.brand_id ? req.body.brand_id : models.brand_id 
        await models.save()
        res.send(`${models} is updated successfully`)
      }
    catch(error)
    {
        res.send("Something went wrong")
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


const read_model_by_id = async(req,res)=>{
    try{
        const models = await models_model.findById(req.params.id)
        if(!models)
        {
            return res.send("No Id found") 
        }
        res.send(models)

    }
    catch(error)
    {
        return res.send("Something went wrong ")
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


  const inactive_models = async(req,res)=>{
    try{

          const models = await models_model.findById(req.params.id)
          if(!models)
          {
            return res.send("Id not found")
          }
          models.status = req.body.status
          let statusType = ''
          if(models.status === 1)
          {
           statusType = "Active"
          }
          else if(models.status === 2)
          {
            statusType = "Inactive"
          }

          await models.save()
          res.send(statusType)
    }
    catch(error)
    {
        return res.send("Something went wrong")
    }
  }
 

module.exports = {addModel,updateModel,read_all_models,read_model_by_id,read_all_brands,inactive_models}