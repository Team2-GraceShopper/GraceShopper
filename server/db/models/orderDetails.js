const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetail = db.define('OrderDetail', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL
  }
})

module.exports = OrderDetail
