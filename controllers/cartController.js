const { Product, Cart, User} = require('../models')

class CartController {
    static async getCart (req, res, next) {
        const UserId = req.userid.id
        try {
            const cart = await Cart.findAll({timestamps: false, where: {UserId}, order:[['id','ASC']],include:[Product]})
            var total = 0
            for (let i = 0; i< cart.length; i++) {
                total += cart[i].quantity * cart[i].Product.price
            }
            res.status(200).json({cart, total})
        } catch (err) {
            next (err)
        }
    }

    static addCart(req, res, next) {
		const ProductId = req.params.productId;
		const UserId = req.userid.id;
		let ProductStock;
		Product.findByPk(ProductId)
			.then((data) => {
				if (!data) {
					next({
						name: 'ProductNotFound',
					});
				} else {
					ProductStock = data.stock;
					return Cart.findOne({
						where: {
							UserId,
							ProductId,
						},
					});
				}
			})
			.then((data) => {
				if (!data) {
					return Cart.create({
						UserId,
						ProductId,
						quantity: 1,
					});
				} else if (data.quantity === ProductStock) {
					next({
						name: 'StockNotEnough',
					});
				} else {
					const updateQuantity = {
						quantity: data.quantity + 1,
					};
					return Cart.update(updateQuantity, {
						where: {
							UserId,
							ProductId,
						},
						returning: true,
					});
				}
			})
			.then((data) => {
				let response;
				if (data.length >= 1) {
					response = data[1][0];
				} else {
					response = data;
				}
				res.status(200).json({
					response,
					message: 'Your Cart is Updated',
				});
			})
			.catch((err) => {
				next(err);
			});
        }
        static minusItem(req, res, next) {
            const cartId = req.params.cartId;
            const UserId = req.userid.id;
            Cart.findOne({
                where: {
                    id: cartId,
                    UserId,
                },
            })
                .then((data) => {
                    if (!data) {
                        next({
                            name: 'CartNotFound',
                        });
                    } else if (data.quantity === 1) {
                        next({
                            name: 'ThisCartQuantityAlreadyOne',
                        });
                    } else {
                        const minusQuantity = {
                            quantity: data.quantity - 1,
                        };
                        return Cart.update(minusQuantity, {
                            where: {
                                id: cartId,
                            },
                            returning: true,
                        });
                    }
                })
                .then((data) => {
                    const response = data[1][0];
                    res.status(200).json({
                        response,
                        message: 'Your Cart is Updated',
                    });
                })
                .catch((err) => {
                    console.log('masuk sini');
                    next(err);
                });
        }

        static deleteCart(req, res, next) {
            const cartId = req.params.cartId;
            const UserId = req.userid.id;
            Cart.findOne({
                where: {
                    id: cartId,
                    UserId,
                },
            })
                .then((data) => {
                    if (!data) {
                        next({
                            name: 'CartNotFound',
                        });
                    } else {
                        return Cart.destroy({
                            where: {
                                id: cartId,
                            },
                        });
                    }
                })
                .then((data) => {
                    res.status(200).json({
                        message: 'This Item has Been Removed',
                    });
                })
                .catch((err) => {
                    next(err);
                });
        }
}

module.exports = {CartController}