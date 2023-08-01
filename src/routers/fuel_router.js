const mongoose = require('mongoose')
const express = require("express")
const router = express.Router()
const multer = require('multer')
const upload = multer()
const {addfuel,update_fuel,readAllFuel,readFuelById,inactiveFuelType} = require('../controllers/fuel_controller')









router.post('/addfuel', upload.none(), addfuel )
router.put('/updatefuel/:id', upload.none(), update_fuel)
router.get('/readfueltype', readAllFuel)
router.get('/readfuelbyid/:id',readFuelById)
router.put('/inactivefueltype/:id', upload.none(), inactiveFuelType)











module.exports = router