import React from 'react'
import {connect} from 'react-redux'
import CartProducts from './CartProducts'
import {getCart, removeItem, updateQty} from '../store/cart'
import {me} from '../store/user'

export class Cart extends React.Component {
  async componentDidMount() {
    await this.props.getUser()
    await this.props.getCart()
  }

  render() {
    return (
      <CartProducts
        cart={this.props.cart}
        removeItem={this.props.removeItem}
        updateQty={this.props.updateQty}
      />
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(getCart()),
  getUser: () => dispatch(me()),
  removeItem: (orderId, productId) => dispatch(removeItem(orderId, productId)),
  updateQty: (orderId, productId, quantity) =>
    dispatch(updateQty(orderId, productId, quantity))
})

export default connect(mapState, mapDispatch)(Cart)
