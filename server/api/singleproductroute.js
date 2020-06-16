const router = require('express').Router()
const Product = require('../db/models/product')
const Category = require('../db/models/category')
module.export = router

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      include: [{model: Category}],
      through: {where: {productId: req.params.id}}
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})
