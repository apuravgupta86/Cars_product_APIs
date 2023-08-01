const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const model_controller = require('../controllers/model_controller')
const models_model = require('../models/models_model')




router.post('/addmodel', upload.none(), model_controller.addModel)
router.put('/updatemodel/:id', upload.none(), model_controller.updateModel)
router.get('/readallmodels', model_controller.read_all_models)
router.get('/readmodels/:id', model_controller.read_model_by_id)
router.get('/readallbrands', model_controller.read_all_brands)
router.put('/inactivemodel/:id',upload.none(), model_controller.inactive_models)






module.exports = router