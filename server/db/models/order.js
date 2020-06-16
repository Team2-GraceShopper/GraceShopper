const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  orderDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  subtotal: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  tax: {
    type: Sequelize.DECIMAL
  },
  total: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  shipStreet: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shipCity: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shipState: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shipZip: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  cardNumber: {
    type: Sequelize.INTEGER,
    validate: {
      isCreditCard: true,
      len: [16]
    }
  },
  cardExpiration: {
    type: Sequelize.DATEONLY
  },
  cvvCode: {
    type: Sequelize.INTEGER,
    validate: {
      len: [3, 4]
    }
  },
  billStreet: {
    type: Sequelize.STRING
  },
  billCity: {
    type: Sequelize.STRING
  },
  billState: {
    type: Sequelize.STRING
  },
  billZip: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.ENUM('active', 'complete'),
    default: 'active'
  }
})

module.exports = Order
