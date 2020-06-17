// /* global describe beforeEach it */

// const {expect} = require('chai')
// const request = require('supertest')
// const db = require('../db')
// const app = require('../index')
// const Order = db.model('order')
// const Product = db.model('product')
// const User = db.model('user')
// const OrderDetail = db.model('OrderDetail')
// const faker = require('faker')

// describe('Cart route', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('/api/cart/', () => {
//     // const codysEmail = 'cody@puppybook.com'

//     // beforeEach(() => {
//     //   return User.create({
//     //     email: codysEmail
//     //   })
//     // })

//     it('GET /api/cart', async () => {
//       try {
//         await User.create({firstName: 'John', lastName: 'Smith', email: 'john@john.com', password: '123'})

//         const user = await request(app)
//         .post('/auth/login')
//         .send({email: 'john@john.com', password: '123'})

//         const order = {
//           userId: user.id,
//           email: 'john@john.com',
//           orderDate: faker.date.past(),
//           subtotal: faker.commerce.price(),
//           tax: 5,
//           total: faker.commerce.price(),
//           shipStreet: faker.address.streetAddress(),
//           shipCity: faker.address.city(),
//           shipState: faker.address.state(),
//           shipZip: faker.address.zipCode().slice(0, 5),
//           billStreet: faker.address.streetAddress(),
//           billCity: faker.address.city(),
//           billState: faker.address.state(),
//           billZip: faker.address.zipCode().slice(0, 5),
//           status: 'active'
//         }
//         const newOrder = await Order.create(order)

//         const products = [
//           {name: 'shoes', price: '5', description: 'blahblahblah', inventory: 5}, {name: 'hat', price: '5', description: 'blahblahblah', inventory: 2},
//           {name: 'shirt', price: '5', description: 'blahblahblah', inventory: 5}
//         ]
//         products.forEach(async (product) => {
//           let newProd = await Product.create(product)
//           await OrderDetail.create({productId: newProd.id, orderId: newOrder.id, quantity: 1, price: newProd.price})
//         })

//         const res = await request(app)
//         .get('/api/cart')
//         .expect(200)

//         console.log(res.body)
//         expect(res.body).to.be.an('array')

//       } catch(err) {
//         console.log(err)
//       }

//       // expect(res.body[0].email).to.be.equal(codysEmail)
//     })
//   }) // end describe('/api/users')
// }) // end describe('User routes')
