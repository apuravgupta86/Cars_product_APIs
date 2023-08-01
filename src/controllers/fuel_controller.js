const mongoose = require("mongoose");
const fuelmodel = require('../models/fuel_model')


const addfuel = async (req, res) => {
  try {
    const formerror = {};
    if (req.body.fuel_type === undefined) {
      formerror.fuel_type = "Fuel type is required";
    }
    if (Object.keys(formerror).length !== 0) {
      return res.send(formerror);
    }
    const getFuel = {
        fuel_type: req.body.fuel_type,
        fuel_slug: req.body.fuel_type.toLowerCase().replace(/ /g, "-"),
    };

    const existingfuel_slug = await fuelmodel.findOne({
        fuel_type: getFuel.fuel_type,
        fuel_slug: getFuel.fuel_slug,
    });

    if (existingfuel_slug) {
      return res.send(`${existingfuel_slug.fuel_slug} slug already added`);
    }
    const fuels = new fuelmodel(getFuel);
    await fuels.save();
    res.send(fuels);
  } catch (error) {
    res.send(error);
  }
}


const update_fuel = async (req, res) => {
    try {
      const fuels = await fuelmodel.findById(req.params.id);
  
      if (req.body.fuel_type) {
        fuels.fuel_type = req.body.fuel_type;
      }
      if (req.body.fuel_slug) {
        fuels.fuel_slug = req.body.fuel_slug.toLowerCase().replace(/ /g, "-");
      } else {
        fuels.fuel_slug;
      }
      await fuels.save();
      res.send(`${fuels} is updated succussfully`);
    } catch (error) {
      return res.send(error);
    }
  };


  const readAllFuel = async (req, res) => {
    try {
      const fuels = await fuelmodel.find();
      if (!fuels) {
        return res.send("No Fuels type found");
      }
      res.send(fuels);
    } catch (error) {
      re.send("Something went wrong");
    }
  };


  const readFuelById = async (req, res) => {
    try {
      const fuels = await fuelmodel.findById(req.params.id);
      if (!fuels) {
        return res.send("Fuel type not found");
      }
      res.send(fuels);
    } catch (error) {
      res.send("Something went wrong or type not found");
    }
  };




  const inactiveFuelType = async(req,res)=>{
    try{
        const fuels = await fuelmodel.findById(req.params.id)
        if(!fuels)
        {
          return res.send("Fuel type not found")
        }
        fuels.status = req.body.status
        let statusType = ''
        if(fuels.status === 1)
        {
         statusType = "Active"
        }
        else if(fuels.status === 2)
        {
          statusType = "Inactive"
        }

        await fuels.save()
        res.send(statusType)

    }
    catch(error)
    {
        return res.send("Something went wrong")
    }
}




module.exports = {addfuel,update_fuel,readAllFuel,readFuelById,inactiveFuelType}