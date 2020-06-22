import axios from 'axios'

//ACTION TYPES
const SET_ORDERS = 'SET_ORDERS'

//ACTION CREATORS
const setOrders = orders => ({
  type: SET_ORDERS,
  orders
})

//THUNKS
export const getOrders = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/orders')
    dispatch(setOrders(data))
  }
}

//INITIAL STATE
const initialState = []

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders
    default:
      return state
  }
}
