const router = require('express').Router()
const {Order, Product, User} = require('../db/models')

//api/checkout

router.put('/user', async (req, res, next) => {
  try {
    let updatedUser
    let userToUpdate = await User.findByPk(req.user.id)
    console.log('req.body in user api', req.body)
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
    const {cart} = req.body
    for (let i = 0; i < cart.length; i++) {
      thisProduct = await Product.findByPk(cart[i].productId)
      thisProduct.update({inventory: thisProduct.inventory - cart[i].quantity})
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
