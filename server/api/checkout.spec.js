const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')

// describe.only('Checkout routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('/api/checkout/', () => {

//     it('PUT /api/checkout', async () => {
//       const req = await request(app)
//         .get('/api/checkout')
//         .expect(200)

//         expect(req.body).to.be.an('object')
//         expect(req.body.products).to.be.an('array')
//     })
//   })
// })
