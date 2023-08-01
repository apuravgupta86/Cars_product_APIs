const mongoose = require('mongoose')
const express = require("express")
const router = express.Router()
const multer = require('multer')
const upload = multer()
const {add_brand,update_brand,read_all_brands,read_brand,delete_brand} = require('../controllers/brand_controller')









router.post('/brands', upload.none(), add_brand )
router.put('/updatebrands/:id', upload.none(), update_brand)
router.get('/readbrands', read_all_brands)
router.get('/readbrandbyid/:id',read_brand)
router.put('/activeinactivebrand/:id', upload.none(), delete_brand)











module.exports = router