import {expect} from 'chai'
import {getProducts} from './products'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import faker from 'faker'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {products: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getProducts', () => {
    let products = []
    let numOfProd = 10

    for (let i = 0; i < numOfProd; i++) {
      let product = {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.lorem.sentence(),
        imageUrl: faker.random.image(),
        inventory: faker.random.number()
      }
      products.push(product)
    }

    it('eventually dispatches the GET PRODUCTS action', async () => {
      mockAxios.onGet('/api/products').replyOnce(200, products)
      await store.dispatch(getProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCTS')
      expect(actions[0].products).to.be.deep.equal(products)
    })
  })
})
