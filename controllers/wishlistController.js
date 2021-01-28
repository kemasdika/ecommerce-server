const { Wishlist, Product } = require('../models');

class WishlistController {
	static async getWishlist(req, res, next) {
        const UserId = req.userid.id
        try {
            const wish = await Wishlist.findAll({where: {UserId}, include:[Product]})
            res.status(200).json(wish)
        } catch (err) {
            next (err)
        }
	}

	static addWishlist(req, res, next) {
		const UserId = req.userid.id;
		const ProductId = req.params.productId;
		const newWishlist = {
			UserId,
			ProductId,
		};
		Product.findOne({
			where: {
				id: ProductId,
			},
		})
			.then((data) => {
				if (!data) {
					next({
						name: 'ProductNotFound',
					});
				} else {
					return Wishlist.findOne({
						where: {
							UserId,
							ProductId,
						},
					});
				}
			})
			.then((data) => {
				if (data) {
					next({
						name: 'YouAlreadyAddThisWishlist',
					});
				} else {
					// res.status(200).json('tes');
					return Wishlist.create(newWishlist);
				}
			})
			.then((data) => {
				res.status(201).json({
					message: 'Success add this Product to Your Wishlist',
				});
			})
			.catch((err) => {
				next(err);
			});
	}

	static deleteWishlist(req, res, next) {
		const wishlistId = req.params.wishId;
		const UserId = req.userid.id;
		Wishlist.findOne({
			where: {
				id: wishlistId,
				UserId,
			},
		})
			.then((data) => {
				if (!data) {
					next({
						name: 'WishListNotFound',
					});
				} else {
					return Wishlist.destroy({
						where: {
							id: wishlistId,
						},
					});
				}
			})
			.then((data) => {
				res.status(200).json({
					message: 'Success Remove this Product from Your Wishlist',
				});
			})
			.catch((err) => {
				next(err);
			});
	}
}

module.exports = {WishlistController}