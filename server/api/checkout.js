const router = require('express').Router()
const {Order, Product, User} = require('../db/models')

//api/checkout

//UPON COMPLETION OF CHECKOUT --> update user's default info, toggle order status, update inventory
//send all updated info (depending on whether user checked 'remember for next time')
//along with the details of which information they want to save to db (req.body.update)
//1: ONLY update shipping addr; 2: ONLY update cc info; 3: update both

router.put('/', async (req, res, next) => {
  try {
    //update user's info
    if (req.update === 1 || req.update === 3) {
      await User.update(
        {
          shipStreet: req.body.shipStreet,
          shipCity: req.body.shipCity,
          shipState: req.body.shipState,
          shipZip: req.body.shipZip
        },
        {where: {id: req.body.userId}}
      )
    }
    if (req.update === 2 || req.update === 3) {
      await User.update(
        {
          cardNumber: req.body.cardNumber,
          cardExpiration: req.body.cardExpiration,
          cvvCode: req.body.cvvCode,
          billStreet: req.body.billStreet,
          billCity: req.body.billCity,
          billState: req.body.billState,
          billZip: req.body.billZip
        },
        {where: {id: req.params.id}}
      )
    }

    //update order status
    await Order.update(
      {status: 'complete'},
      {
        where: {id: req.body.orderId}
      }
    )

    //update inventory amount
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
  } catch (err) {
    next(err)
  }
})

router.post('/')

module.exports = router
