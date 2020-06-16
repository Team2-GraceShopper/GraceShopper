const db = require('./db')
const Category = require('./models/category')
const Order = require('./models/order')
const Product = require('./models/product')
const User = require('./models/user')

// register models
require('./models')

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(Product, {through: 'OrderDetails'})
Product.belongsTo(Order, {through: 'OrderDetails'})

Category.hasMany(Product)
Product.belongsTo(Category)

User.hasMany(Product, {through: 'ShoppingCart'})
Product.belongsTo(User, {through: 'ShoppingCart'})

module.exports = db
