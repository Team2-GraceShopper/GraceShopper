const router = require('express').Router()
const {Order, Product, User} = require('../db/models')

//api/checkout

router.put('/user', async (req, res, next) => {
  try {
    let updatedUser
    let userToUpdate = await User.findByPk(req.user.id)
    console.log('user in api', req.body.user)
    const {
      shipStreet,
      shipCity,
      shipState,
      shipZip,
      cardNumber,
      cardExpiration,
      cvvCode
    } = req.body.user
    if (shipStreet && cardNumber) {
      updatedUser = await userToUpdate.update(
        {
          shipStreet,
          shipCity,
          shipState,
          shipZip,
          cardNumber,
          cardExpiration,
          cvvCode
        },
        {returning: true}
      )
    } else if (!cardNumber) {
      updatedUser = await userToUpdate.update(
        {
          shipStreet,
          shipCity,
          shipState,
          shipZip
        },
        {returning: true}
      )
    } else {
      updatedUser = await userToUpdate.update(
        {
          cardNumber,
          cardExpiration,
          cvvCode
        },
        {returning: true}
      )
    }
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})

router.put('/product', async (req, res, next) => {
  try {
    let thisProduct
    for (let i = 0; i < req.body.products.length; i++) {
      thisProduct = await Product.findById(req.body.products[i].productId)
      Product.update(
        {inventory: thisProduct.inventory - req.body.products[i].quantity},
        {
          where: {id: req.body.products[i].productId}
        }
      )
    }
    const products = await Product.findAll()
    res.json(products)
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
