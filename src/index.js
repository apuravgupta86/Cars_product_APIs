const connection = require('./db/connection')
const express = require('express')
const app = express()
const routeOne = require('./routers/brand_router')
const routeTwo = require('./routers/model_router')
const routeThree = require('./routers/variant_router')
const routeFour = require('./routers/product_router')
const routeFive = require('./routers/fuel_router')
const routeSix = require('./routers/bodytype_router')



app.use(routeSix)
app.use(routeFive)
app.use(routeFour)
app.use(routeThree)
app.use(routeTwo)
app.use(routeOne)
app.use(express.json())











app.listen(4500,()=>{
    console.log("Connected to localhost:4500")
})