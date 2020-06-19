const router = require('express').Router()
const {Order, Product, OrderDetail} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.getCart(req.user.id)
      if (!order)
        res.status(404).send(`Nothing in cart for user ${req.user.id}`)
      else {
        res.json(order)
      }
    } else res.status(404).send('Nothing in cart')
  } catch (err) {
    next(err)
  }
})

router.post('/item', async (req, res, next) => {
  let order, wasCreated
  try {
    if (req.user) {
      ;[order, wasCreated] = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          email: req.user.email,
          status: 'active'
        }
      })
    }
  } catch (err) {
    next(err)
  }
  try {
    const newOrder = await OrderDetail.create({
      orderId: order.id,
      productId: req.body.id,
      quantity: req.body.quantity,
      price: req.body.price
    })
    console.log('NEWORDERRRRR', newOrder)
    res.status(201).json(newOrder)
  } catch (err) {
    next(err)
  }
})
