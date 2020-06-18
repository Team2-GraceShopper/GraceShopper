import React from 'react'
import {connect} from 'react-redux'
import CartProducts from './CartProducts'
import {getCart, removeItem} from '../store/cart'
import {me} from '../store/user'

export class Cart extends React.Component {
  async componentDidMount() {
    await this.props.getUser()
    await this.props.getCart()
  }

  render() {
    return (
      <CartProducts cart={this.props.cart} removeItem={this.props.removeItem} />
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(getCart()),
  getUser: () => dispatch(me()),
  removeItem: (orderId, productId) => dispatch(removeItem(orderId, productId))
})

export default connect(mapState, mapDispatch)(Cart)
