const router = require('express').Router()
const {User} = require('../db/models')
const {isAdmin} = require('./gatekeeper')
module.exports = router

router.use(async (req, res, next) => {
  if (req.user && isAdmin(req.user)) next()
  else res.status(401).send('Unauthorized access to users')
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'email']
    })
    user
      ? res.json(user)
      : res.status(404).send(`User ${req.params.id} not found`)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.status(201).send(newUser)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const [updatedCount, updatedUsers] = await User.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    if (updatedCount) res.status(201).send(updatedUsers[0])
    else res.status(404).send(`User ${req.params.id} not found`)
  } catch (error) {
    next(error)
  }
})
