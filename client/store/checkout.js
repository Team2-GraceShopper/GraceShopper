// import axios from 'axios'

// const UPDATE_DATA = 'UPDATE_DATA'

// const updatedData = (newShipment, newBilling) => {
//   return {
//     type: UPDATE_DATA,
//     newShipment,
//     newBilling
//   }
// }

// export const updateData = () => async dispatch => {
//   try {
//     const updated = await axios.put('/api/checkout')
//     dispatch(updatedData(updated.data || defaultProducts))
//   } catch (err) {
//     console.error(err)
//   }
// }

// export default function(state = defaultProducts, action) {
//   switch (action.type) {
//     case GET_PRODUCTS:
//       return action.products
//     default:
//       return state
//   }
// }

//to delete^
