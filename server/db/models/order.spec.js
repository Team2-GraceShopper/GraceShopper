const {expect} = require('chai')
const db = require('../db')
const Order = require('./order')

describe.only('Order model', () => {
  before(() => db.sync({force: true}))

  const order = {
    email: 'cody@email.com',
    orderDate: new Date(Date.now()),
    subtotal: 12.34,
    tax: 5
  }

  afterEach(() => db.sync({force: true}))

  describe('column definitions and validations', () => {
    it('`email` cannot be null', async () => {
      let noEmailOrder = {...order}

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
      let badEmailOrder = {...order}

      badEmailOrder.email = 'not a proper email'

      const savedBadEmailOrder = await Order.build(badEmailOrder)
      return savedBadEmailOrder.validate().then(
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

    it('`total` returns subtotal plus tax as string', async () => {
      const savedOrder = await Product.create(order)

      const subtotal = savedOrder.subtotal
      const tax = savedOrder.tax / 100
      const total = subtotal + subtotal * tax

      expect(savedOrder.total).to.equal(total)
    })
  })

  // describe('class method: getCart', () => {
  //   it('gets cart by order id', async () => {
  //     const initialProduct = await Product.create(product)

  //     const updateInfo = {
  //       name: 'an updated name',
  //       inventory: 9
  //     }

  //     const [statusCode, updatedProduct] = await Product.updateProduct(
  //       initialProduct.id,
  //       updateInfo
  //     )

  //     expect(updatedProduct.name).to.equal('an updated name')
  //     expect(updatedProduct.inventory).to.equal(9)
  //     expect(updatedProduct.description).to.equal('some description')
  //   })
  // })
})
