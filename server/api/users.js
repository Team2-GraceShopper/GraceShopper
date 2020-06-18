const router = require('express').Router()
const {User} = require('../db/models')
const {isAdmin} = require('./gatekeeper')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user && isAdmin(req.user)) {
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email']
      })
      res.json(users)
    } else res.status(401).send('Unauthorized access to users')
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    if (req.user && isAdmin(req.user)) {
      const user = await User.findByPk(req.params.id, {
        attributes: ['id', 'email']
      })
      user
        ? res.json(user)
        : res.status(404).send(`User ${req.params.id} not found`)
    } else res.status(401).send('Unauthorized access to users')
  } catch (error) {
    next(error)
  }
})
