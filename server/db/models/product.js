const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    // allowNull: false, // null will be saved as 0
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
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

//CLASS METHODS
Product.updateProduct = async function(id, data) {
  const [updatedCount, updatedProducts] = await this.update(data, {
    where: {
      id: id
    },
    returning: true
  })
  if (updatedCount) return [201, updatedProducts[0]]
  else return [404, `No product found with id ${id}`]
}

module.exports = Product
