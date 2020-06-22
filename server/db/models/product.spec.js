const {expect} = require('chai')
const db = require('../db')
const Product = require('./product')

describe('Product model', () => {
  before(() => db.sync({force: true}))

  const product = {
    name: 'some product',
    price: 12.34,
    description: 'some description',
    imageUrl: 'http://lorempixel.com/640/480/abstract',
    inventory: 9
  }

  afterEach(() => db.sync({force: true}))

  describe('column definitions and validations', () => {
    it('has a `name`, `price`, `description`, `imageUrl` and `inventory`', async () => {
      const savedProduct = await Product.create(product)

      expect(savedProduct.name).to.equal('some product')
      expect(savedProduct.price).to.equal(12.34)
      expect(savedProduct.description).to.equal('some description')
      expect(savedProduct.imageUrl).to.equal(
        'http://lorempixel.com/640/480/abstract'
      )
      expect(savedProduct.inventory).to.equal(9)
    })

    it('`name` is required', async () => {
      let noNameProduct = {...product}

      noNameProduct.name = null

      const savedNoNameProduct = await Product.build(noNameProduct)
      return savedNoNameProduct.validate().then(
        () => {
          throw new Error('Validation should have failed!')
        },
        err => {
          expect(err.message).to.include(
            'notNull Violation: product.name cannot be null'
          )
        }
      )
    })

    it('`name` cannot be empty string', async () => {
      let emptyNameProduct = {...product}

      emptyNameProduct.name = ''

      const savedEmptyNameProduct = await Product.build(emptyNameProduct)
      return savedEmptyNameProduct.validate().then(
        () => {
          throw new Error('Validation should have failed!')
        },
        err => {
          expect(err.message).to.include(
            'Validation error: Validation notEmpty on name failed'
          )
        }
      )
    })

    it('`description` is required', async () => {
      let noDesProduct = {...product}

      noDesProduct.description = null

      const savedNoDesProduct = await Product.build(noDesProduct)
      return savedNoDesProduct.validate().then(
        () => {
          throw new Error('Validation should have failed!')
        },
        err => {
          expect(err.message).to.include(
            'notNull Violation: product.description cannot be null'
          )
        }
      )
    })

    it('`inventory` is required', async () => {
      let noInvProduct = {...product}

      noInvProduct.inventory = null

      const savedNoInvProduct = await Product.build(noInvProduct)
      return savedNoInvProduct.validate().then(
        () => {
          throw new Error('Validation should have failed!')
        },
        err => {
          expect(err.message).to.include(
            'notNull Violation: product.inventory cannot be null'
          )
        }
      )
    })
  })

  describe('class method: updateProduct', () => {
    it('updates product by id', async () => {
      const initialProduct = await Product.create(product)

      const updateInfo = {
        name: 'an updated name',
        inventory: 9
      }

      const [statusCode, updatedProduct] = await Product.updateProduct(
        initialProduct.id,
        updateInfo
      )

      expect(updatedProduct.name).to.equal('an updated name')
      expect(updatedProduct.inventory).to.equal(9)
      expect(updatedProduct.description).to.equal('some description')
    })
  })
})
