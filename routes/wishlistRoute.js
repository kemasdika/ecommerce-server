const express = require('express')
const router = express.Router()
const {WishlistController} = require('../controllers/wishlistController')

router.get('/wishlists',WishlistController.getWishlist)
router.post('/wishlists/:productId',WishlistController.addWishlist)
router.delete('/wishlists/:wishId',WishlistController.deleteWishlist)

module.exports = router