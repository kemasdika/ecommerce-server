const express = require('express')
const router = express.Router()

const userRoute = require('./userRoute')
const productRoute = require('./productRoute')
const cartRoute = require('./cartRoute')
const wishRoute = require('./wishlistRoute')
const {authenticate} = require('../middlewares/auth')

router.use('/',userRoute)
router.use('/',productRoute)
router.use(authenticate)
router.use('/',cartRoute)
router.use('/',wishRoute)

module.exports = router