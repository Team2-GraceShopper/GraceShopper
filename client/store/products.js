import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'

const defaultProducts = []

const gotProducts = products => ({type: GET_PRODUCTS, products})

export const getProducts = categoryId => async dispatch => {
  try {
    let res
    if (categoryId) {
      res = await axios.get(`/api/products/category/${categoryId}`)
    } else {
      res = await axios.get('/api/products')
    }
    dispatch(gotProducts(res.data || defaultProducts))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
