import axios from 'axios'

//action types
export const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'

//action creators
export const setSingleProduct = product => ({type: SET_SINGLE_PRODUCT, product})

//thunk creator
export const fetchSingleProduct = id => async dispatch => {
  const {data} = await axios.get(`/api/products/${id}`)
  dispatch(setSingleProduct(data))
}

export const addToCart = id => async dispatch => {
  const {data} = await axios.get(`/api/products/${id}`)
  dispatch(addedToCart(data))
}

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
