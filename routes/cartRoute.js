const express = require('express')
const router = express.Router()
const {CartController} = require('../controllers/cartController')

router.get('/carts',CartController.getCart)
router.post('/carts/:productId',CartController.addCart)
router.patch('/carts/:cartId',CartController.minusItem)
router.delete('/carts/:cartId',CartController.deleteCart)

module.exports = router