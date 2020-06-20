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

// TODO: GET past orders
// router.get('/history', async (req, res, next) => {
//   try {
//     if (req.user) {
//       const orders = await Order.findAll({
//         where: {
//           userId: req.user.id,
//           status: 'complete'
//         },
//         include: [Product]
//         // might have to include through: [OrderDetail]
//       })
//     }
//   } catch (err) {
//     next(err)
//   }
// })

// POST new order and order-product details
router.post('/', async (req, res, next) => {
  let order, wasCreated

  try {
    if (req.user) {
      ;[order, wasCreated] = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          email: req.user.email,
          status: 'active'
        }
      })
    }
  } catch (err) {
    next(err)
  }
  try {
    let products = []
    req.body.cart.forEach(product => {
      products.push({
        orderId: order.id,
        productId: product.productId,
        quantity: product.quantity,
        price: product.price
      })
    })
    const newOrders = await OrderDetail.bulkCreate(products)
    res.status(201).json(newOrders)
  } catch (err) {
    next(err)
  }
})

router.post('/item', async (req, res, next) => {
  let order, wasCreated
  try {
    if (req.user) {
      ;[order, wasCreated] = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          email: req.user.email,
          status: 'active'
        }
      })
    }
  } catch (err) {
    next(err)
  }
  try {
    const newOrder = await OrderDetail.create({
      orderId: order.id,
      productId: req.body.id,
      quantity: req.body.quantity,
      price: req.body.price
    })
    res.status(201).json(newOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId/:productId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    if (req.user.id === order.userId) {
      const [updatedCount, updatedOrder] = await OrderDetail.update(req.body, {
        where: {
          orderId: req.params.orderId,
          productId: req.params.productId
        },
        returning: true
      })
      if (updatedCount) res.json(updatedOrder)
      else res.status(404).send(`Could not update order ${req.params.orderId}`)
    } else res.sendStatus(401)
  } catch (err) {
    next(err)
  }
})
