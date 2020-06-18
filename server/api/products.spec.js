const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const faker = require('faker')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    let products = []
    let numOfProd = 10

    for (let i = 0; i < numOfProd; i++) {
      let product = {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.lorem.sentence(),
        imageUrl: faker.random.image(),
        inventory: faker.random.number()
      }
      products.push(product)
    }

    beforeEach(() => {
      return Product.bulkCreate(products)
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(products[0].name)
      expect(res.body[3].description).to.be.equal(products[3].description)
      expect(res.body[9].price).to.be.equal(products[9].price)
    })
  })
})
