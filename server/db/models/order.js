const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const Order = db.define('order', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  orderDate: {
    type: Sequelize.DATE
  },
  subtotal: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  tax: {
    type: Sequelize.DECIMAL
  },
  total: {
    type: Sequelize.DECIMAL
  },
  shipStreet: {
    type: Sequelize.STRING
  },
  shipCity: {
    type: Sequelize.STRING
  },
  shipState: {
    type: Sequelize.STRING
  },
  shipZip: {
    type: Sequelize.INTEGER
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

//CLASS METHODS
Order.getCart = async function(id) {
  console.log(typeof this)
  const order = await this.findOne({
    where: {
      userId: id,
      status: 'active'
    },
    include: {
      model: Product
    }
  })
  if (!order) {
    return 0
  } else {
    const cart = order.products.map(product => {
      const subtotal = product.price * product.OrderDetail.quantity
      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        imageUrl: product.imageUrl,
        inventory: product.inventory,
        quantity: product.OrderDetail.quantity,
        subtotal
      }
    })
    return cart
  }
}

module.exports = Order
