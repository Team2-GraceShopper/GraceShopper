const router = require('express').Router()
const {Product, Category} = require('../db/models')
const {isAdmin} = require('./gatekeeper')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (isAdmin(req.user)) {
      const product = await Product.create(req.body)
      res.json(product)
    } else {
      res.status(401).send('Unauthorized to create product')
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    if (isAdmin(req.user)) {
      const updatedProduct = await Product.updateProduct(
        req.params.id,
        req.body
      )
      res.status(updatedProduct[0]).send(updatedProduct[1])
    } else {
      res.status(401).send('Unauthorized to edit product')
    }
  } catch (error) {
    next(error)
  }
})
