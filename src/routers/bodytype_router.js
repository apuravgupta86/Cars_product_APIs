const mongoose = require('mongoose')
const express = require("express")
const router = express.Router()
const multer = require('multer')
const upload = multer()
const {addBodyType,update_body,readAllBodyTypes,readBodyById,inactiveBodyType} = require('../controllers/body_type_controller')









router.post('/addbodytype', upload.none(), addBodyType )
router.put('/updatebodytype/:id', upload.none(), update_body)
router.get('/readbodytype', readAllBodyTypes)
router.get('/readbodybyid/:id',readBodyById)
router.put('/inactivebodytype/:id', upload.none(), inactiveBodyType)











module.exports = router