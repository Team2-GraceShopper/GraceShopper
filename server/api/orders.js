const router = require('express').Router()
const {Order, Product, OrderDetail} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log(req.user)
    if (req.user) {
      const orders = await Order.findAll({
        where: {
          userId: req.user.id,
          status: 'complete'
        },
        include: {
          model: Product
        }
      })
      res.json(orders)
    } else next()
  } catch (err) {
    next(err)
  }
})
