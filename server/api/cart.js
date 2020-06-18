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

router.delete('/:order/:product', async (req, res, next) => {
  try {
    if (req.user && req.user.id === req.body.userId) {
      const deleteCount = await OrderDetail.destroy({
        where: {
          productId: req.params.product,
          orderId: req.params.order
        }
      })
      res.sendStatus(204)
    } else res.status(401).send('Unauthorized access to cart')
  } catch (err) {
    next(err)
  }
})
