const router = require('express').Router()
const {Order, Product, User} = require('../db/models')

//api/checkout

//UPON COMPLETION OF CHECKOUT --> update user's default info, toggle order status, update inventory
//send all updated info (depending on whether user checked 'remember for next time')

router.put('/user', async (req, res, next) => {
  try {
    //update user's info
    if (req.body.newShipment) {
      await User.update(
        {
          shipStreet: req.body.newShipment.shipStreet,
          shipCity: req.body.newShipment.shipCity,
          shipState: req.body.newShipment.shipState,
          shipZip: req.body.newShipment.shipZip
        },
        {where: {id: req.body.userId}}
      )
    }

    if (req.body.newBilling) {
      await User.update(
        {
          cardNumber: req.body.newBilling.cardNumber,
          cardExpiration: req.body.newBilling.cardExpiration,
          cvvCode: req.body.newBilling.cvvCode,
          billStreet: req.body.newBilling.billStreet,
          billCity: req.body.newBilling.billCity,
          billState: req.body.newBilling.billState,
          billZip: req.body.newBilling.billZip
        },
        {where: {id: req.params.id}}
      )
    }

    //res.json data
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
