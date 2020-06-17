const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('Checkout routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/checkout/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/checkout', async () => {
      const res = await request(app)
        .get('/api/checkout')
        .expect(200)

      expect(res.body).to.be.an('array')
      //   expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
