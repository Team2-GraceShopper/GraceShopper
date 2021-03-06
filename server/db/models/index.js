const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const Order = require('./order')
const OrderDetail = require('./orderDetails')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Product, {through: 'OrderDetail'})
Product.belongsToMany(Order, {through: 'OrderDetail'})

Category.hasMany(Product)
Product.belongsTo(Category)

// User.belongsToMany(Product, {through: 'ShoppingCart'})
// Product.belongsToMany(User, {through: 'ShoppingCart'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Category,
  Product,
  Order,
  OrderDetail
}
