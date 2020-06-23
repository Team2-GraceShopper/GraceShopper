'use strict'
const nodemailer = require('nodemailer')
const {
  email
} = require('/Users/sheli/Fullstack/Immersive/Senior/GraceShopper/secrets.js')
const html = require('html-template-tag')

const address = process.env.EMAIL || email.address
const password = process.env.PASS || email.password

function Main(to, order) {
  const transporter = nodemailer.createTransport({
    // service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: address,
      pass: password
    }
  })

  const mailOptions = {
    from: address,
    to: to,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html: generateEmail(order)
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

const priceFormat = {
  style: 'currency',
  currency: 'USD'
}

const generateEmail = order => html`<!DOCTYPE html>
<html>
<h1>Thank you for your order!</h1>
<h2>Your confirmation number is ${order.id}</h2>
<h2>You can expect to receive your order in 1-2 weeks</h2>

<h3>Order Summary:</h3>
<table>
  <tr>
    <td>Product</td>
    <td>Quantity</td>
    <td>Price</td>
  </tr>
  ${order.products.map(
    product => html`
    <tr>
      <td>${product.name}</td>
      <td>${product.OrderDetail.quantity}</td>
      <td>${product.OrderDetail.price.toLocaleString('en-US', priceFormat)}</td>
    </tr>`
  )}
  <tr>
    <td></td>
    <td>Subtotal</td>
    <td>${order.subtotal.toLocaleString('en-US', priceFormat)}</td>
  </tr>
  <tr>
    <td></td>
    <td>Tax</td>
    <td>${order.tax.toLocaleString('en-US', priceFormat)}</td>
  </tr>
  <tr>
    <td></td>
    <td>Total</td>
    <td>${order.total.toLocaleString('en-US', priceFormat)}</td>
  </tr>
</table>
</html>`

const testOrder = {
  orderDate: '2020-06-22',
  subtotal: 573,
  tax: 0.05,
  total: 601.65,
  id: 1,
  email: 'Burley_Watsica5@gmail.com',
  shipStreet: '870 Franecki Roads',
  shipCity: 'Lake Derekbury',
  shipState: 'Alaska',
  shipZip: 40789,
  cardNumber: null,
  cardExpiration: null,
  // "cvvCode": null,
  // "billStreet": "870 Franecki Roads",
  // "billCity": "Lake Derekbury",
  // "billState": "Alaska",
  // "billZip": 40789,
  // "status": "complete",
  // "createdAt": "2020-06-22T17:51:36.318Z",
  // "updatedAt": "2020-06-22T17:51:36.318Z",
  // "userId": 52,
  products: [
    {
      price: 599,
      // "id": 1,
      name: 'Incredible Concrete Fish',
      // "description": "Saepe doloribus sint repudiandae animi.",
      // "imageUrl": "http://lorempixel.com/640/480/food",
      // "inventory": 20,
      // "createdAt": "2020-06-22T17:51:36.064Z",
      // "updatedAt": "2020-06-22T17:51:36.064Z",
      // "categoryId": 4,
      OrderDetail: {
        price: 27,
        quantity: 2,
        createdAt: '2020-06-22T17:51:36.622Z',
        updatedAt: '2020-06-22T17:51:36.622Z',
        orderId: 1,
        productId: 1
      }
    },
    {
      price: 313,
      id: 5,
      name: 'Tasty Frozen Sausages',
      description: 'Ut ipsa tempora est praesentium voluptatem sit ut enim.',
      imageUrl: 'http://lorempixel.com/640/480/fashion',
      inventory: 3,
      createdAt: '2020-06-22T17:51:36.073Z',
      updatedAt: '2020-06-22T17:51:36.073Z',
      categoryId: 2,
      OrderDetail: {
        price: 600,
        quantity: 1,
        createdAt: '2020-06-22T17:51:36.623Z',
        updatedAt: '2020-06-22T17:51:36.623Z',
        orderId: 1,
        productId: 5
      }
    }
  ]
}

if (module === require.main) {
  Main('gayle.ortiz@ethereal.email', testOrder)
}
