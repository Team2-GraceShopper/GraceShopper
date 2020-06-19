import axios from 'axios'

//ACTION TYPE
const SET_CART = 'SET_CART'
const UPDATE_QTY = 'UPDATE_QTY'

//ACTION CREATORS
const setCart = cart => ({
  type: SET_CART,
  cart
})

const updatedQty = (productId, quantity) => ({
  type: UPDATE_QTY,
  productId,
  quantity
})

// //THUNKS
export const getCart = user => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      if (state.user.id) {
        //get user's cart from DB
        const {data} = await axios.get('/api/cart')
        window.localStorage.setItem('cart', JSON.stringify(data))
        //set to local storage
        // and pass to dispatch
        dispatch(setCart(data))
      } else {
        const data = window.localStorage.getItem('cart')
          ? JSON.parse(window.localStorage.getItem('cart'))
          : []
        dispatch(setCart(data))
      }
    } catch (err) {
      console.error(err)
    }
  }
}

export const removeItem = (orderId, productId) => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const newCart = state.cart.filter(
        product => product.productId !== productId
      )
      if (state.user.id) {
        //remove item from DB cart
        await axios.delete(`/api/cart/${orderId}/${productId}`, {
          data: {userId: state.user.id}
        })
      }
      //remove item from local storage
      window.localStorage.setItem('cart', JSON.stringify(newCart))
      //remove item from store
      dispatch(setCart(newCart))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateQty = (orderId, productId, quantity) => {
  return async (dispatch, getState) => {
    try {
      //if user is logged in, update in DB
      //update on local storage
      //update in store
    } catch (err) {
      console.error(err)
    }
  }
}

//EXAMPLE CART FOR DEV
// const exampleCart = [
//   {
//       "orderId": 101,
//       "productId": 5,
//       "name": "Small Concrete Pants",
//       "price": "663.00",
//       "description": "Maiores incidunt nam voluptatem assumenda tenetur aut ut odit illum.",
//       "imageUrl": "http://lorempixel.com/640/480/nightlife",
//       "inventory": 11,
//       "quantity": 1,
//       "subtotal": 663
//   },
//   {
//       "orderId": 101,
//       "productId": 3,
//       "name": "Tasty Granite Keyboard",
//       "price": "50.00",
//       "description": "Quaerat est atque et.",
//       "imageUrl": "http://lorempixel.com/640/480/nature",
//       "inventory": 20,
//       "quantity": 4,
//       "subtotal": 200
//   }
// ]

//INITIAL STATE
const initialCart = []

//REDUCER
export default function(state = initialCart, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart
    default:
      return state
  }
}
