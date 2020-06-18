const router = require('express').Router()
const {Order, Product, User} = require('../db/models')

//api/checkout

//UPON COMPLETION OF CHECKOUT --> update user's default info, toggle order status, update inventory
//send all updated info (depending on whether user checked 'remember for next time')

router.put('/user', async (req, res, next) => {
  try {
    let user = User.findById(req.user.id)
    for (let key in req.body) {
      if (req.body[key]) await user.update({key: req.body[key]})
    }
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/product', async (req, res, next) => {
  try {
    let thisProduct
    for (let i = 0; i < req.body.products.length; i++) {
      thisProduct = await Product.findOne({
        where: {id: req.body.products[i].productId}
      })
      Product.update(
        {
          inventory: thisProduct.inventory - req.body.products[i].quantity
        },
        {where: {id: req.body.products[i].productId}}
      )
    }
  } catch (error) {
    next(error)
  }
})

router.put('/order', async (req, res, next) => {
  try {
    await Order.update(
      {
        status: 'complete'
      },
      {
        where: {id: req.body.orderId}
      }
    )
  } catch (error) {
    next(error)
  }
})

module.exports = router
