import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SingleProduct} from './SingleProduct'
import SingleProductRender from './SingleProductRender'
import faker from 'faker'
import {Provider} from 'react-redux'
import store from '../store'

import {JSDOM} from 'jsdom'
// const dom = new JSDOM('', {url: 'http://localhost'})
// const dom = new JSDOM('<!doctype html><html><body></body></html>')
// global.document = dom
// global.window = doc.defaultView

const {document} = new JSDOM('<!doctype html><html><body></body></html>').window
global.document = document
global.window = document.defaultView

// const adapter = new Adapter()
// enzyme.configure({adapter})

describe('Single Product', () => {
  let wrapper
  let product = {
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.lorem.sentence(),
    imageUrl: faker.random.image()
  }

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <SingleProduct product={product} />
      </Provider>
    )
  })

  it('renders SingleProductRender component', () => {
    // expect(wrapper.find('SingleProductRender').length).to.be.equal(1)
    expect(wrapper.containsMatchingElement(<SingleProductRender />)).to.equal(
      true
    )
  })
})

describe('SingleProductRender', () => {
  let wrapper
  let product = {
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.lorem.sentence(),
    imageUrl: faker.random.image()
  }
  let quantity = 4

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <SingleProductRender product={product} quantity={quantity} />
      </Provider>
    )
  })

  it("renders each product's name", () => {
    expect(wrapper.contains(product.name)).to.equal(true)
  })

  it("renders the product's price", () => {
    expect(wrapper.contains(product.price)).to.equal(true)
  })

  it('renders the quantity that is passed as a prop', () => {
    expect(wrapper.containsMatchingElement(<div>{quantity}</div>)).to.equal(
      true
    )
  })

  it("renders the product's image", () => {
    expect(
      wrapper.containsMatchingElement(<img src={product.imageUrl} />)
    ).to.equal(true)
  })
})
