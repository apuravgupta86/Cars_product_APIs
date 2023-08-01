const mongoose = require('mongoose')
const variant_model = require('../models/variant_model')
const models_model = require('../models/models_model')
const brand_model = require('../models/brand_model')
const product_model = require('../models/product_model')
const res = require('express/lib/response')


const addProduct = async(req,res)=>{
    try{
        const formerror = {}
     if(req.body.product_name === undefined)
     {
        formerror.product_name = "Product name is required"
     }
     if(req.body.registration_year === undefined)
     {
        formerror.registration_year = "registration_year is required"
     }
     if(req.body.registration_state === undefined)
     {
        formerror.registration_state = "registration_state is required"
     }
     if(req.body.kms_driven === undefined)
     {
        formerror.kms_driven = "kms_driven is required"
     }
     if(req.body.ownership === undefined)
     {
        formerror.ownership = "ownership is required"
     }
     if(req.body.fuel_type === undefined)
     {
        formerror.fuel_type = "fuel_type is required"
     }
     if(req.body.price === undefined)
     {
        formerror.price = "price is required"
     }
     if(req.body.body_type === undefined)
     {
        formerror.body_type = "body_type is required"
     }

    if(Object.keys(formerror).length !== 0 )
     {
        return res.send(formerror)
     }
     const getProducts ={
        brand_id:req.body.brand_id,
        model_id:req.body.model_id,
        variant_id:req.body.variant_id,
        product_name:req.body.product_name,
        product_slug:req.body.product_name.toLowerCase().replace(/ /g, "-"),
        registration_year:req.body.registration_year,
        registration_state:req.body.registration_state,
        kms_driven:req.body.kms_driven,
        ownership:req.body.ownership,
        fuel_type:req.body.fuel_type,
        price:req.body.price,
        body_type:req.body.body_type
     }
     
     const existingProducts = await product_model.findOne({product_name:getProducts.product_name,product_slug:getProducts.product_slug})
     if(existingProducts)
     {
        return res.send("Product is already added")
     }
     const products = await product_model(getProducts)
     await products.save()
     res.send(products)
    }
    catch(error)
    {
        return res.send("Something Went Wrong")
    }
}



const updateProduct = async(req,res)=>{
    try{
      const products = await product_model.findById(req.params.id)
      if(req.body.product_name)
      {
        products.product_name = req.body.product_name
      }
      if(req.body.product_slug)
      {
        products.product_slug = req.body.product_slug.toLowerCase().replace(/ /g, "-")
      }
      else {
        products.product_slug
      }
      if(req.body.brand_id)
      {
        products.brand_id = req.body.brand_id
      }
      if(req.body.variant_id)
      {
        products.variant_id = req.body.variant_id
      }
      if(req.body.model_id)
      {
        products.model_id = req.body.model_id
      }
      if(req.body.registration_year)
      {
        products.registration_year = req.body.registration_year
      }
      if(req.body.registration_state)
      {
        products.registration_state = req.body.registration_state
      }
      if(req.body.kms_driven)
      {
        products.kms_driven = req.body.kms_driven
      }
      if(req.body.ownership)
      {
        products.ownership = req.body.ownership
      }
      if(req.body.fuel_type)
      {
        products.fuel_type = req.body.fuel_type
      }
      if(req.body.price)
      {
        products.price = req.body.price
      }
      if(req.body.body_type)
      {
        products.body_type = req.body.body_type 
      }

      await products.save()
      res.send(`${products} is updated successfully`)

    }
    catch(error)
    {
        return res.send("Something went wrong")
    }
}


const read_product_by_id = async(req,res) =>{
    try{
          
        const products = await product_model.findById(req.params.id)
        if(!products)
        {
            return res.send("Id not found")
        }
        res.send(products)
    }
    catch(error)
    {
        res.send("Something went wrong")
    }
}

const realallproducts = async(req,res) =>{
    try{
          
        const products = await product_model.find().populate([
        {path:"brand_id", select:['brand_name']}
    ])
    .populate([
        {path:"model_id", select:['model_name']}
    ])
    .populate([
        {path:"variant_id", select:['variant_name']}
    ])
        if(!products)
        {
            return res.send("Id not found")
        }
        res.send(products)
    }
    catch(error)
    {
        res.send("Something went wrong")
    }
}



const inactive_products = async(req,res)=>{
    try{
        const products = await product_model.findById(req.params.id)
        if(!products)
        {
          return res.send("Id not found")
        }
        products.status = req.body.status
        let statusType = ''
        if(products.status === 1)
        {
         statusType = "Active"
        }
        else if(products.status === 2)
        {
          statusType = "Inactive"
        }

        await products.save()
        res.send(statusType)

    }
    catch(error)
    {
        return res.send("Something went wrong")
    }
}



const fetch_model_by_brand = async(req,res)=>{
  try{
    const fetch = await models_model.find({brand_id:req.params.id})
    console.log(fetch)

  }
  catch(error)
  {
    res.send(error)
  }
}






module.exports ={addProduct,updateProduct,read_product_by_id,inactive_products,realallproducts,fetch_model_by_brand}