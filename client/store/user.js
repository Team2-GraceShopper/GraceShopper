import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */

export const updateUser = user => {
  //if saveAddress & saveBilling, remove all unnecessary keys and pass info if one/both = true
  // console.log('updateUser line 27', user)
  return async dispatch => {
    // console.log('inside updateUser thunk creator', user)
    const {data} = await axios.put('/api/checkout/user', {user: user})
    dispatch(getUser(data))
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.log(err)
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

    if (localStorage.getItem('cart')) {
      const cart = JSON.parse(window.localStorage.getItem('cart'))
      await axios.post('/api/cart', {cart})
    }
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
    if (window.localStorage.getItem('cart')) {
      window.localStorage.removeItem('cart')
    }
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
    default:
      return state
  }
}
