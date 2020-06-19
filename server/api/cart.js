const router = require('express').Router()
const {Order, Product} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  // console.log('user', req.user)
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
