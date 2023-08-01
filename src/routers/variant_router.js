const mongoose = require('mongoose')
const variant_controller = require('../controllers/variant_controller')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()




router.post('/addvariant',upload.none(),variant_controller.addVariant)
router.put('/updatevariant/:id',upload.none(),variant_controller.updateVariant)
router.get('/readallvariants', variant_controller.read_all_variants)
router.get('/getmodels', variant_controller.read_all_models)
router.get('/getbrands', variant_controller.read_all_brands)
router.get('/readvariantbyid/:id',variant_controller.read_variant_by_id)
router.put('/activeinactivevariants/:id', upload.none(),variant_controller.inactive_variants)





module.exports = router