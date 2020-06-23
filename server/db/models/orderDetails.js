const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetail = db.define('OrderDetail', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true
    },
    set(value) {
      this.setDataValue('price', parseInt(value * 100, 10))
    },
    get() {
      const price = this.getDataValue('price')
      return price / 100
    }
  }
})

module.exports = OrderDetail
