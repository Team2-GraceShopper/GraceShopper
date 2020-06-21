import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_SHIPPING = 'UPDATE_SHIPPING'
const UPDATE_BILLING = 'UPDATE_BILLING'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateShipping = newData => ({type: UPDATE_SHIPPING, newData})
const updateBilling = newData => ({type: UPDATE_BILLING, newData})

/**
 * THUNK CREATORS
 */

export const updateUser = user => {
  //if saveAddress & saveBilling, remove all unnecessary keys and pass info if one/both = true
  // console.log('updateUser line 27', user)
  return async dispatch => {
    console.log('inside updateUser thunk creator', user)
    const {data} = await axios.put('/api/checkout/user', {user: user})
    if (data.shipStreet) dispatch(updateShipping(data))
    if (data.cardNumber) dispatch(updateBilling(data))
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (
  method,
  email,
  password,
  firstName = null,
  lastName = null
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      firstName,
      lastName
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
    // ^change it to '/', add "Hello [user]" on navbar
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_SHIPPING:
      return {
        ...state,
        shipStreet: action.newData.shipStreet,
        shipCity: action.newData.shipCity,
        shipState: action.newData.shipState,
        shipZip: action.newData.shipZip
      }
    case UPDATE_BILLING:
      return {
        ...state,
        cardNumber: action.newData.cardNumber,
        cardExpiration: action.newData.cardExpiration,
        cvvCode: action.newData.cvvCode
      }
    default:
      return state
  }
}
