import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from './AllProducts'
import AllProductsRender from './AllProductsRender'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import faker from 'faker'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllProducts', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<AllProducts />)
  })

  it('renders AllProductsRender component', () => {
    expect(wrapper.find('AllProductsRender').length).to.be.equal(1)
  })
})

describe('AllProductsRender', () => {
  let wrapper
  let products = []
  let numOfProd = 10

  for (let i = 0; i < numOfProd; i++) {
    let product = {
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.lorem.sentence(),
      imageUrl: faker.random.image()
    }
    products.push(product)
  }

  beforeEach(() => {
    wrapper = shallow(<AllProductsRender products={products} />)
  })

  it('renders all products as cards', () => {
    expect(wrapper.find(CardContent).length).to.be.equal(10)
  })

  it("renders each product's name", () => {
    products.forEach(product => {
      expect(wrapper.contains(product.name)).to.equal(true)
    })
  })

  it("renders each product's price", () => {
    products.forEach(product => {
      expect(wrapper.contains(product.price)).to.equal(true)
    })
  })

  it("renders each product's image", () => {
    products.forEach(product => {
      expect(
        wrapper.find(CardMedia).filterWhere(item => {
          return item.prop('image') === product.imageUrl
        })
      ).to.have.lengthOf.above(0)
    })
  })
})
