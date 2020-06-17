import axios from 'axios'

const UPDATE_DATA = 'UPDATE_DATA'

const updatedData = (newShipment, newBilling) => {
  let toUpdate = 0
  if (newShipment && newBilling) toUpdate = 3
  else if (newShipment) toUpdate = 2
}

const gotProducts = products => ({type: GET_PRODUCTS, products})

export const getProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
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
