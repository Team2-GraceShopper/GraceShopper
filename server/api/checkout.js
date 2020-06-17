const router = require('express').Router()
const {Order} = require('../db/models')

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {}
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

module.exports = router
