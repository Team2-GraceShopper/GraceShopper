const {expect} = require('chai')
const db = require('../db')
const {Product, Order, OrderDetail} = require('./index')

describe.only('Product model', () => {
  beforeEach(() => db.sync({force: true}))

  describe('column definitions and validations', () => {
    // it('has a `name` and `ingredients`', async () => {
    //   const puppaccino = await Coffee.create({
    //     name: 'Puppaccino',
    //     ingredients: ['espresso', 'frothed milk', 'love']
    //   })
    //   expect(puppaccino.name).to.equal('Puppaccino')
    //   expect(puppaccino.ingredients).to.deep.equal(['espresso', 'frothed milk', 'love'])
    // })
    // it('`name` is required', async () => {
    //   const coffee = Coffee.build()
    //   return coffee.validate()
    //     .then(
    //       () => {
    //         throw new Error('Validation should have failed!')
    //       },
    //       (err) => {
    //         expect(err).to.be.an('error')
    //       }
    //     )
    // })
  })

  describe('class method: updateProduct', () => {
    // it('finds coffee by ingredient', async () => {
    //   await Promise.all([
    //     Coffee.create({
    //       name: 'Cafe au Lait',
    //       ingredients: ['french press', 'scalded milk']
    //     }),
    //     Coffee.create({
    //       name: 'Galao',
    //       ingredients: ['espresso', 'foam']
    //     }),
    //     Coffee.create({
    //       name: 'Mocha',
    //       ingredients: ['espresso', 'hot cocoa', 'whipped cream']
    //     })
    //   ])
    //   const drinksWithEspresso = await Coffee.findByIngredient('espresso')
    //   const drinksWithWhippedCream = await Coffee.findByIngredient('whipped cream')
    //   expect(drinksWithEspresso.length).to.equal(2)
    //   expect(drinksWithEspresso.some(drink => drink.name === 'Mocha')).to.equal(true)
    //   expect(drinksWithEspresso.some(drink => drink.name === 'Galao')).to.equal(true)
    //   expect(drinksWithWhippedCream.length).to.equal(1)
    //   expect(drinksWithWhippedCream.some(drink => drink.name === 'Mocha')).to.equal(true)
    // })
  })

  describe('hooks', () => {
    it('converts price to pennies in the database', async () => {
      const product = await Product.create({
        name: 'some product name',
        price: 275.95,
        description: 'some description',
        inventory: 1
      })

      expect(product.price).to.be.an('integer')

      await product.update({
        price: 0.99
      })

      expect(product.price).to.be.an('integer')
    })
  })
})
