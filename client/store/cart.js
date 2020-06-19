import axios from 'axios'

//ACTION TYPE
const SET_CART = 'SET_CART'
const UPDATE_QTY = 'UPDATE_QTY'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVED_ITEM = 'REMOVED_ITEM'

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

const addedItem = product => ({
  type: ADD_TO_CART,
  product
})

const removedItem = productId => ({
  type: REMOVED_ITEM,
  productId
})

// //THUNKS

export const addItem = (product, quantity) => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      let orderDetail
      if (state.user.id) {
        orderDetail = await axios.post('/api/cart/item', {
          id: product.id,
          quantity,
          price: product.price
        })
      }
      const newItem = {
        ...product,
        orderId: orderDetail.orderId || null,
        quantity,
        subtotal: quantity * product.price
      }
      dispatch(addedItem(newItem))

      const newState = getState()
      window.localStorage.setItem('cart', JSON.stringify(newState.cart))
    } catch (err) {
      console.error(err)
    }
  }
}

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
      if (state.user.id) {
        //remove item from DB cart
        await axios.delete(`/api/cart/${orderId}/${productId}`, {
          data: {userId: state.user.id}
        })
      }
      //remove item from store
      dispatch(removedItem(productId))
      const newState = getState()
      //remove item from local storage
      window.localStorage.setItem('cart', JSON.stringify(newState.cart))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateQty = (orderId, productId, quantity) => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      if (state.user.id) {
        const {data} = axios.put(`/api/cart/${orderId}/${productId}`, {
          quantity: quantity
        })
      }
      dispatch(updatedQty(productId, quantity))
      const newState = getState()
      window.localStorage.setItem('cart', JSON.stringify(newState.cart))
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
    case ADD_TO_CART:
      return [...state, action.product]
    case UPDATE_QTY:
      return state.map(product => {
        if (product.productId === action.productId) {
          product.quantity = action.quantity
          product.subtotal = action.quantity * product.price
        }
        return product
      })
    case REMOVED_ITEM:
      return state.filter(product => product.productId !== action.productId)
    default:
      return state
  }
}
