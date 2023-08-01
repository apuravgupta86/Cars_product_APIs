const mongoose = require("mongoose");
const brand_model = require("../models/brand_model");
const brand_router = require("../routers/brand_router");

// console.log('DNO AD NF no jn on'.toLowerCase().replace(/ /g,'-'))

const add_brand = async (req, res) => {
  try {
    const formerror = {};
    if (req.body.brand_name === undefined) {
      formerror.brand_name = "Brand name is required";
    }
    if (Object.keys(formerror).length !== 0) {
      return res.send(formerror);
    }
    const getBrands = {
      brand_name: req.body.brand_name,
      brand_slug: req.body.brand_name.toLowerCase().replace(/ /g, "-"),
      created_at: req.body.created_at,
      updated_at: req.body.updated_at,
    };

    const existingBrand_slug = await brand_model.findOne({
      brand_name: getBrands.brand_name,
      brand_slug: getBrands.brand_slug,
    });

    if (existingBrand_slug) {
      return res.send(`${existingBrand_slug.brand_slug} slug already added`);
    }
    const brands = new brand_model(getBrands);
    await brands.save();
    res.send(brands);
  } catch (error) {
    res.send(error);
  }
};

const update_brand = async (req, res) => {
  try {
    const brands = await brand_model.findById(req.params.id);

    if (req.body.brand_name) {
      brands.brand_name = req.body.brand_name;
    }
    if (req.body.brand_slug) {
      brands.brand_slug = req.body.brand_slug.toLowerCase().replace(/ /g, "-");
    } else {
      brands.brand_slug;
    }
    // brands.brand_slug = req.body.brand_slug ? req.body.brand_slug.toLowerCase().replace(/ /g,'-') : brands.brand_slug
    await brands.save();
    res.send(`${brands} is updated succussfully`);
  } catch (error) {
    return res.send(error);
  }
};

const read_all_brands = async (req, res) => {
  //readAllBrands
  try {
    const brands = await brand_model.find();
    if (!brands) {
      return res.send("No brands found");
    }
    res.send(brands);
  } catch (error) {
    re.send("Something went wrong");
  }
};

const read_brand = async (req, res) => {
  try {
    const brands = await brand_model.findById(req.params.id);
    if (!brands) {
      return res.send("Brand ID not found");
    }
    res.send(brands);
  } catch (error) {
    res.send("Something went wrong or Id not found");
  }
};

const delete_brand = async (req, res) => {
  try {
    const brands = await brand_model.findById(req.params.id);
    if (!brands) {
      return res.send("Id not found");
    }
    console.log(req.body);
    brands.status = req.body.status ? req.body.status : brands.status;
    let statusType = "";
    if (brands.status === 1) {
      statusType = "Active";
    } else if (brands.status === 2) {
      statusType = "Inactive";
    }

    await brands.save();
    res.send(`${statusType}`);
  } catch (error) {
    res.send("Something went wrong , Id not found");
  }
};

module.exports = {
  add_brand,
  update_brand,
  read_all_brands,
  read_brand,
  delete_brand,
};
