import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'

const defaultProducts = []

const gotProducts = products => ({type: GET_PRODUCTS, products})

export const getProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(gotProducts(res.data || defaultProducts))
  } catch (err) {
    console.error(err)
  }
}

//updateProducts thunk creator (inventory)
export const updateInventory = cart => {
  console.log('inside updateInventory')
  return async dispatch => {
    try {
      console.log('inside thunk return')
      const updatedProducts = await axios.put('/api/checkout/product', {
        cart: cart
      })
      dispatch(gotProducts(updatedProducts))
    } catch (error) {
      console.log('error', error)
    }
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
