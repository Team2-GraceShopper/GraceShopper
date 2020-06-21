const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-datetime'))
const db = require('../db')
const {Order, Product, User, OrderDetail} = require('.')
const faker = require('faker')

describe('Order model', () => {
  before(() => db.sync({force: true}))

  const order = {
    email: 'cody@email.com',
    subtotal: 23.0
  }

  afterEach(() => db.sync({force: true}))

  describe('column definitions and validations', () => {
    it('`email` cannot be null', async () => {
      const noEmailOrder = {...order}

      noEmailOrder.email = null

      const savedNoEmailOrder = await Order.build(noEmailOrder)
      return savedNoEmailOrder.validate().then(
        () => {
          throw new Error('Validation should have failed!')
        },
        err => {
          expect(err.message).to.include(
            'notNull Violation: order.email cannot be null'
          )
        }
      )
    })

    it('`email` must be in proper format', async () => {
      const badEmailOrder = {...order}

      badEmailOrder.email = 'not a proper email'

      const savedBadEmailOrder = await Order.build(badEmailOrder)
      return savedBadEmailOrder.validate().then(
        () => {
          throw new Error('Validation should have failed!')
        },
        err => {
          expect(err.message).to.include(
            'Validation error: Validation isEmail on email failed'
          )
        }
      )
    })

    it('`orderDate` is set to the present moment when the order is created or completed', async () => {
      const now = new Date(Date.now())

      const newOrder = await Order.create({
        ...order,
        orderDate: 'some date the order was created'
      })

      expect(newOrder.orderDate).to.closeToTime(now, 0.1)

      let updateOrder
      const notNow = new Date('Sun, 9 Oct 1994 23:38:17 GMT')

      // temporarily reassign Date.now() to return a different value in local scope. upon Order.create, setter will set orderDate to be this different value. then revert Date.now() to its original value. this will test if setter will reset orderDate to the present moment upon update.
      const temp = Date.now
      const mockDateFunc = async () => {
        Date.now = () => notNow
        updateOrder = await Order.create({...order, orderDate: 'not now'})
        Date.now = temp
      }

      await mockDateFunc()

      expect(updateOrder.orderDate).to.equalTime(notNow)

      await updateOrder.update({
        status: 'complete',
        orderDate: 'updated date will be today'
      })

      expect(updateOrder.orderDate).to.closeToTime(now, 0.1)
    })

    it('`total` returns total price after tax', async () => {
      const savedOrder = await Order.create(order)

      await savedOrder.update({
        total: 'this will be saved as total price after tax'
      })

      const subtotal = savedOrder.subtotal
      const tax = savedOrder.tax / 100
      const total = subtotal + subtotal * tax

      expect(savedOrder.total).to.equal(total)
    })
  })

  describe('class method: getCart', () => {
    it('gets cart by user id', async () => {
      const user = await User.create({
        firstName: 'Grace',
        lastName: 'Hopper',
        email: 'grace@hopper.com'
      })

      const newOrder = await Order.create({
        email: 'go@team2.com',
        userId: user.id
      })

      const products = []

      for (let i = 0; i < 10; i++) {
        products.push({
          name: faker.commerce.productName(),
          price: faker.commerce.price(),
          description: faker.lorem.sentence(),
          imageUrl: faker.random.image(),
          inventory: Math.floor(Math.random() * 100) + 1
        })
      }

      const newProducts = await Product.bulkCreate(products)

      const orderDetails = []

      newProducts.forEach(product => {
        orderDetails.push({
          orderId: newOrder.id,
          productId: product.id,
          quantity: 1,
          price: faker.commerce.price()
        })
      })

      await OrderDetail.bulkCreate(orderDetails)

      const cart = await Order.getCart(user.id)

      expect(cart).to.have.lengthOf(10)
      expect(cart[0].orderId).to.equal(newOrder.id)
    })
  })
})
