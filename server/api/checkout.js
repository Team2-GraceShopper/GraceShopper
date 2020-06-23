const router = require('express').Router()
const {Order, Product, User} = require('../db/models')
// const stripe = require('stripe')('sk_test_51GxFA0HUyOa5eg00V59OGLY14Yh8LJz1VWf0LOUYyHIRlUGrgeRhv0jCXOyvmdvYnRVu5jrRAlZle78qMrxPZgSx00HTZnbZH4', {apiVersion: ''})

//api/checkout

// router.get('/secret', async (req, res) => {
//   const intent = // ... Fetch or create the PaymentIntent
//   res.json({client_secret: intent.client_secret});
// });

// router.post('v1/payment_intents', async (req, res, next) => {
//   try {
//     stripe.paymentIntents.create(
//       {
//         amount: req.body.amount,
//         currency: 'usd',
//         payment_method_types: ['card']
//       }
//     )
//   } catch (error) {
//     next(error)
//   }
// })

router.put('/user', async (req, res, next) => {
  try {
    let updatedUser
    let userToUpdate = await User.findByPk(req.user.id)
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
    const {data} = req.body
    await Order.upsert({
      id: data.id,
      email: data.email,
      orderDate: new Date(Date.now()),
      subTotal: data.subTotal,
      tax: data.tax,
      total: data.total,
      shipStreet: data.shipStreet,
      shipCity: data.shipCity,
      shipState: data.shipState,
      shipZip: data.shipZip,
      cardNumber: data.cardNumber,
      cardExpiration: data.cardExpiration,
      cvvCode: data.cvvCode,
      status: 'complete',
      userId: req.user ? req.user.id : 1
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
