// import axios from 'axios'

//ACTION TYPE
const GET_CART = 'GET_CART'
const UPDATE_QTY = 'UPDATE_QTY'

//ACTION CREATORS

// //THUNKS
// export const getCart = () => {
//   return async (dispatch, getState) => {
//     const state = getState();
//     if (state.user.id) {
//       const {data} = axios.get('/api/cart')
//       //get user's cart from DB
//       //set to local storage
//       // and pass to dispatch
//     } else if //if cart is set on local storage
//       //pass to dispatch
//     //else send empty cart to dispatch
//   }
// }

//INITIAL STATE
const initialCart = {}

//REDUCER
// export default

//EXAMPLE OUTPUT FROM AXIOS GET REQUEST
// {
//   "id": 101,
//   "email": "jake@jake.com",
//   "orderDate": "2019-06-21T16:43:39.755Z",
//   "subtotal": "880.00",
//   "tax": "3",
//   "total": "75.00",
//   "shipStreet": "305 Koepp Station",
//   "shipCity": "Harbermouth",
//   "shipState": "Rhode Island",
//   "shipZip": 71788,
//   "cardNumber": null,
//   "cardExpiration": null,
//   "cvvCode": null,
//   "billStreet": "2199 Luettgen Grove",
//   "billCity": "Santosburgh",
//   "billState": "New Mexico",
//   "billZip": 56663,
//   "status": "active",
//   "createdAt": "2020-06-16T22:54:14.392Z",
//   "updatedAt": "2020-06-16T22:54:14.392Z",
//   "userId": 52,
//   "products": [
//       {
//           "id": 1,
//           "name": "Tasty Granite Soap",
//           "price": "922.00",
//           "description": "Consequatur molestias et quis beatae possimus voluptatem expedita est et.",
//           "imageUrl": "http://lorempixel.com/640/480/technics",
//           "inventory": 34,
//           "createdAt": "2020-06-16T22:54:13.689Z",
//           "updatedAt": "2020-06-16T22:54:13.689Z",
//           "categoryId": 4,
//           "OrderDetail": {
//               "quantity": 3,
//               "price": "518.00",
//               "createdAt": "2020-06-16T22:54:15.073Z",
//               "updatedAt": "2020-06-16T22:54:15.073Z",
//               "orderId": 101,
//               "productId": 1
//           }
//       },
//       {
//           "id": 5,
//           "name": "Practical Fresh Pants",
//           "price": "875.00",
//           "description": "Fuga atque ipsum.",
//           "imageUrl": "http://lorempixel.com/640/480/food",
//           "inventory": 72,
//           "createdAt": "2020-06-16T22:54:13.699Z",
//           "updatedAt": "2020-06-16T22:54:13.699Z",
//           "categoryId": 6,
//           "OrderDetail": {
//               "quantity": 3,
//               "price": "815.00",
//               "createdAt": "2020-06-16T22:54:15.073Z",
//               "updatedAt": "2020-06-16T22:54:15.073Z",
//               "orderId": 101,
//               "productId": 5
//           }
//       },
//       {
//           "id": 3,
//           "name": "Gorgeous Granite Soap",
//           "price": "557.00",
//           "description": "Nam odit nemo eligendi velit vel non doloremque.",
//           "imageUrl": "http://lorempixel.com/640/480/abstract",
//           "inventory": 98,
//           "createdAt": "2020-06-16T22:54:13.695Z",
//           "updatedAt": "2020-06-16T22:54:13.695Z",
//           "categoryId": 3,
//           "OrderDetail": {
//               "quantity": 3,
//               "price": "358.00",
//               "createdAt": "2020-06-16T22:54:15.074Z",
//               "updatedAt": "2020-06-16T22:54:15.074Z",
//               "orderId": 101,
//               "productId": 3
//           }
//       },
//       {
//           "id": 7,
//           "name": "Incredible Fresh Salad",
//           "price": "70.00",
//           "description": "Molestiae dolor nisi reprehenderit quis adipisci.",
//           "imageUrl": "http://lorempixel.com/640/480/abstract",
//           "inventory": 43,
//           "createdAt": "2020-06-16T22:54:13.703Z",
//           "updatedAt": "2020-06-16T22:54:13.703Z",
//           "categoryId": 6,
//           "OrderDetail": {
//               "quantity": 5,
//               "price": "374.00",
//               "createdAt": "2020-06-16T22:54:15.075Z",
//               "updatedAt": "2020-06-16T22:54:15.075Z",
//               "orderId": 101,
//               "productId": 7
//           }
//       },
//       {
//           "id": 2,
//           "name": "Incredible Plastic Ball",
//           "price": "145.00",
//           "description": "Nostrum qui id delectus perspiciatis sit voluptatem et quam rerum.",
//           "imageUrl": "http://lorempixel.com/640/480/city",
//           "inventory": 2,
//           "createdAt": "2020-06-16T22:54:13.693Z",
//           "updatedAt": "2020-06-16T22:54:13.693Z",
//           "categoryId": 3,
//           "OrderDetail": {
//               "quantity": 2,
//               "price": "459.00",
//               "createdAt": "2020-06-16T22:54:15.076Z",
//               "updatedAt": "2020-06-16T22:54:15.076Z",
//               "orderId": 101,
//               "productId": 2
//           }
//       },
//       {
//           "id": 66,
//           "name": "Refined Concrete Tuna",
//           "price": "822.00",
//           "description": "Nam dolorem libero et a quasi in.",
//           "imageUrl": "http://lorempixel.com/640/480/sports",
//           "inventory": 71,
//           "createdAt": "2020-06-16T22:54:13.829Z",
//           "updatedAt": "2020-06-16T22:54:13.829Z",
//           "categoryId": 5,
//           "OrderDetail": {
//               "quantity": 3,
//               "price": "731.00",
//               "createdAt": "2020-06-16T22:54:15.076Z",
//               "updatedAt": "2020-06-16T22:54:15.076Z",
//               "orderId": 101,
//               "productId": 66
//           }
//       }
//   ]
// }
