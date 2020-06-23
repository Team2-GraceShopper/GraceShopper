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
    type: Sequelize.DATEONLY,
    validate: {
      isDate: true
    },
    set() {
      const now = new Date(Date.now())
      this.setDataValue('orderDate', now)
    },
    // since orderDate is not required, when no value is passed in, order.orderDate returns null --> this getter is for testing purposes
    get() {
      if (this.getDataValue('orderDate') === null) {
        return new Date(Date.now())
      }
      return this.getDataValue('orderDate')
    }
  },
  subtotal: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true
    },
    set(value) {
      this.setDataValue('subtotal', parseInt(value * 100, 10))
    },
    get() {
      const subtotal = this.getDataValue('subtotal')
      return subtotal / 100
    }
  },
  tax: {
    type: Sequelize.INTEGER,
    defaultValue: 5,
    validate: {
      isInt: true
    },
    set(value) {
      this.setDataValue('tax', parseInt(value * 100, 10))
    },
    get() {
      const subtotal = this.getDataValue('tax')
      return subtotal / 100
    }
  },
  total: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true
    },
    // set() {
    //   let subtotal = this.getDataValue('subtotal')
    //   let tax = this.getDataValue('tax') / 100
    //   let finaltotal = subtotal + subtotal * tax
    //   this.setDataValue('total', finaltotal)
    // },
    set(value) {
      this.setDataValue('total', parseInt(value * 100, 10))
    },
    get() {
      const total = this.getDataValue('total')
      return total / 100
    }
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
    type: Sequelize.BIGINT,
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
      len: [3, 4],
      isInt: true
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
    type: Sequelize.INTEGER,
    validate: {
      isInt: true
    }
  },
  status: {
    type: Sequelize.ENUM('active', 'complete'),
    defaultValue: 'active'
  }
})

//DEFINE CLASS METHODS
Order.getCart = async function(id) {
  const order = await Order.findOne({
    where: {
      userId: id,
      status: 'active'
    },
    include: {
      model: Product
    }
  })
  if (!order) return 0
  const cart = order.products.map(product => {
    const subtotal = product.price * product.OrderDetail.quantity
    return {
      orderId: product.OrderDetail.orderId,
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

module.exports = Order
