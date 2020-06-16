const db = require('./db')
const Category = require('./models/category')
const Order = require('./models/order')
const Product = require('./models/product')
const User = require('./models/user')

// register models
require('./models')

module.exports = db
