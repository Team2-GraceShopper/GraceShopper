const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')

describe('Checkout routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/checkout/', () => {
    const req = {}

    it('PUT /api/checkout', async () => {
      const res = await request(app)
        .get('/api/checkout')
        .expect(200)

      expect(req.body).to.be.an('object')
      expect(req.body.products[0]).to.be.an('array')
    })
  })
})
