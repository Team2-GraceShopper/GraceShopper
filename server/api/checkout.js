const router = require('express').Router()
const {Order, Product, User} = require('../db/models')

//api/checkout

router.put('/user', async (req, res, next) => {
  try {
    let updatedUser
    let userToUpdate = User.findById(req.user.id)
    console.log('user in api', req.body.user)
    const {
      firstName,
      lastName,
      email,
      shipStreet,
      shipCity,
      shipState,
      shipZip,
      cardNumber,
      cardExpiration,
      cvvCode
    } = req.body.user
    updatedUser = await userToUpdate.update(
      {
        firstName,
        lastName,
        email,
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
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})

// router.put('/product', async (req, res, next) => {
//   try {
//     let thisProduct
//     for (let i = 0; i < req.body.products.length; i++) {
//       thisProduct = await Product.findOne({
//         where: {id: req.body.products[i].productId}
//       })
//       Product.update(
//         {inventory: thisProduct.inventory - req.body.products[i].quantity},
//         {
//           where: {id: req.body.products[i].productId}
//         }
//       )
//     }
//   } catch (error) {
//     next(error)
//   }
// })

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