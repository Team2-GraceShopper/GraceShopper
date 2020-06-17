const router = require('express').Router()
const {Order, Product} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  console.log('user', req.user)
  try {
    if (req.user) {
      const order = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'active'
        },
        include: {
          model: Product
        }
      })
      if (!order)
        res.status(404).send(`Nothing in cart for user ${req.user.id}`)
      else {
        const cart = order.products.map(product => {
          return {
            productId: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            imageUrl: product.imageUrl,
            inventory: product.inventory,
            quantity: product.OrderDetail.quantity
          }
        })
        // res.json(order.products)
        res.json(cart)
      }
    } else res.status(404).send('Nothing in cart')
  } catch (err) {
    next(err)
  }
})
