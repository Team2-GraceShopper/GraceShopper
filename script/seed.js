'use strict'

const db = require('../server/db')
const {
  User,
  Category,
  Product,
  Order,
  OrderDetail
} = require('../server/db/models')
const faker = require('faker')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await seedCategories()
  await seedProducts()
  await seedUsers()
  await seedOrders()
  await seedOrderDetails()

  // const users = await Promise.all([
  //   User.create(faker.fake("{{name.lastName}}, {{name.firstName}} {{name.lastName}}")),
  //   User.create({email: 'murphy@email.com', password: '123'})
  // ])

  // console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

//seed product categories
async function seedCategories() {
  const categories = [
    'Loneliness',
    'Hunger',
    'Staying Safe',
    'Learning',
    'Entertaining Yourself',
    'Self Care',
    'Essentials'
  ]
  for (let i = 0; i < categories.length; i++) {
    await Category.create({name: categories[i]})
  }
  console.log(`seeded ${categories.length} categories`)
  return categories
}

//seed products
async function seedProducts() {
  const products = []
  for (let i = 0; i <= 100; i++) {
    let name = faker.commerce.productName()
    let price = faker.commerce.price()
    let description = faker.lorem.sentence()
    let imageUrl = faker.random.image()
    let inventory = Math.floor(Math.random() * 100) + 1
    let categoryId = Math.floor(Math.random() * 7) + 1
    let product = await Product.create({
      name,
      price,
      description,
      imageUrl,
      inventory,
      categoryId
    })
    products.push(product)
  }
  console.log(`seeded ${products.length} products`)
  return products
}

//seed users
async function seedUsers() {
  const users = []
  for (let i = 0; i < 50; i++) {
    let firstName = faker.name.firstName()
    let lastName = faker.name.lastName()
    let email = faker.internet.email()
    let user = await User.create({firstName, lastName, email})
    users.push(user)
  }

  let user2 = await User.create({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@john.com',
    password: '123',
    cardNumber: 4916776723833984,
    cardExpiration: '2030-01-01',
    cvvCode: 123,
    billStreet: '1 Fullstack Street',
    billCity: 'Brooklyn',
    billState: 'NY',
    billZip: 11111
  })

  users.push(user2)

  console.log(`seeded ${users.length} users`)
  return users
}

//seed orders
async function seedOrders() {
  const orders = []
  for (let i = 0; i < 100; i++) {
    let userId = Math.floor(Math.random() * 50) + 1
    let {email} = await User.findOne({
      where: {
        id: userId
      }
    })
    let orderDate = faker.date.past()
    let subtotal = faker.commerce.price()
    let tax = 5
    let total = subtotal + tax
    let shipStreet = faker.address.streetAddress()
    let shipCity = faker.address.city()
    let shipState = faker.address.state()
    let shipZip = faker.address.zipCode().slice(0, 5)
    let billStreet = shipStreet
    let billCity = shipCity
    let billState = shipState
    let billZip = shipZip
    let order = await Order.create({
      email,
      orderDate,
      subtotal,
      tax,
      total,
      shipStreet,
      shipCity,
      shipState,
      shipZip,
      billStreet,
      billCity,
      billState,
      billZip,
      status: 'complete',
      userId
    })
    orders.push(order)
  }

  console.log(`seeded ${orders.length} orders`)
  return orders
}

//seed order details
async function seedOrderDetails() {
  let count = 0
  for (let i = 1; i <= 100; i++) {
    let numProducts = Math.floor(Math.random() * 10) + 1
    let products = [1, 5, 3, 7, 2, 66, 33, 11, 55, 43, 77, 93, 72]
    for (let j = 0; j < numProducts; j++) {
      let productId = products[j]
      let quantity = Math.floor(Math.random() * 5) + 1
      let price = faker.commerce.price()
      await OrderDetail.create({
        orderId: i,
        productId,
        quantity,
        price
      })
      count++
    }
  }
  console.log(`seeded ${count} order details`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
