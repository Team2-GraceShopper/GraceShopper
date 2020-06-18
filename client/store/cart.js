import axios from 'axios'

//ACTION TYPE
const SET_CART = 'SET_CART'
const UPDATE_QTY = 'UPDATE_QTY'
const REMOVE_ITEM = 'REMOVE_ITEM'

//ACTION CREATORS
const setCart = cart => ({
  type: SET_CART,
  cart
})

const removedItem = id => ({
  type: REMOVE_ITEM,
  id
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

      //else if  cart is set on local storage
      //pass to dispatch
      //else send empty cart to dispatch
    } catch (err) {
      console.error(err)
    }
  }
}

export const removeItem = id => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      // const newCart = state.cart.filter
      if (state.user.id) {
        //remove item from DB cart
      }
      //remove item from local storage
      //remove item from store
    } catch (err) {
      console.error(err)
    }
  }
}

//EXAMPLE CART FOR DEV
const exampleCart = {
  orderId: 1,
  cart: [
    {
      productId: 1,
      name: 'Awesome Soft Towels',
      price: '247.00',
      description: 'Atque et quas laudantium impedit iste.',
      imageUrl: 'http://lorempixel.com/640/480/sports',
      inventory: 84,
      quantity: 2
    },
    {
      productId: 5,
      name: 'Sleek Cotton Hat',
      price: '586.00',
      description: 'Debitis harum placeat ut debitis quis modi aut.',
      imageUrl: 'http://lorempixel.com/640/480/nature',
      inventory: 89,
      quantity: 4
    },
    {
      productId: 3,
      name: 'Handmade Plastic Computer',
      price: '343.00',
      description:
        'Nihil eligendi adipisci voluptatem culpa ipsum quis iusto sunt eius.',
      imageUrl: 'http://lorempixel.com/640/480/abstract',
      inventory: 75,
      quantity: 1
    },
    {
      productId: 7,
      name: 'Rustic Soft Shirt',
      price: '785.00',
      description: 'Asperiores est esse corporis dicta.',
      imageUrl: 'http://lorempixel.com/640/480/food',
      inventory: 59,
      quantity: 3
    },
    {
      productId: 2,
      name: 'Awesome Rubber Mouse',
      price: '710.00',
      description: 'Maiores omnis deserunt eos ut alias sed eius maxime.',
      imageUrl: 'http://lorempixel.com/640/480/food',
      inventory: 56,
      quantity: 1
    },
    {
      productId: 66,
      name: 'Gorgeous Cotton Tuna',
      price: '880.00',
      description: 'In minus quia maxime iusto inventore.',
      imageUrl: 'http://lorempixel.com/640/480/abstract',
      inventory: 60,
      quantity: 1
    }
  ]
}

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

//EXAMPLE OUTPUT FROM AXIOS GET REQUEST
// {
//   "orderId": 101,
//   "cart": [
//       {
//           "productId": 1,
//           "name": "Awesome Soft Towels",
//           "price": "247.00",
//           "description": "Atque et quas laudantium impedit iste.",
//           "imageUrl": "http://lorempixel.com/640/480/sports",
//           "inventory": 84,
//           "quantity": 2
//       },
//       {
//           "productId": 5,
//           "name": "Sleek Cotton Hat",
//           "price": "586.00",
//           "description": "Debitis harum placeat ut debitis quis modi aut.",
//           "imageUrl": "http://lorempixel.com/640/480/nature",
//           "inventory": 89,
//           "quantity": 4
//       },
//       {
//           "productId": 3,
//           "name": "Handmade Plastic Computer",
//           "price": "343.00",
//           "description": "Nihil eligendi adipisci voluptatem culpa ipsum quis iusto sunt eius.",
//           "imageUrl": "http://lorempixel.com/640/480/abstract",
//           "inventory": 75,
//           "quantity": 1
//       },
//       {
//           "productId": 7,
//           "name": "Rustic Soft Shirt",
//           "price": "785.00",
//           "description": "Asperiores est esse corporis dicta.",
//           "imageUrl": "http://lorempixel.com/640/480/food",
//           "inventory": 59,
//           "quantity": 3
//       },
//       {
//           "productId": 2,
//           "name": "Awesome Rubber Mouse",
//           "price": "710.00",
//           "description": "Maiores omnis deserunt eos ut alias sed eius maxime.",
//           "imageUrl": "http://lorempixel.com/640/480/food",
//           "inventory": 56,
//           "quantity": 1
//       },
//       {
//           "productId": 66,
//           "name": "Gorgeous Cotton Tuna",
//           "price": "880.00",
//           "description": "In minus quia maxime iusto inventore.",
//           "imageUrl": "http://lorempixel.com/640/480/abstract",
//           "inventory": 60,
//           "quantity": 1
//       },
//       {
//           "productId": 33,
//           "name": "Practical Soft Mouse",
//           "price": "435.00",
//           "description": "Ea ex necessitatibus voluptas consequatur qui voluptates fuga.",
//           "imageUrl": "http://lorempixel.com/640/480/food",
//           "inventory": 54,
//           "quantity": 3
//       }
//   ]
// }
