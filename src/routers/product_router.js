const mongoose = require('mongoose')
const product_controller = require('../controllers/product_controller')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()




router.post('/addproduct',upload.none(),product_controller.addProduct)
router.put('/updateproduct/:id',upload.none(),product_controller.updateProduct)
router.get('/readproductbyid/:id',product_controller.read_product_by_id)
router.put('/statusproducts/:id', upload.none(),product_controller.inactive_products)
router.get('/readallproducts',product_controller.realallproducts)
router.get('/fetchmodelsbybrand/:id',product_controller.fetch_model_by_brand)





module.exports = router