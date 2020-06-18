import React from 'react'
import {connect} from 'react-redux'
import CartProducts from './CartProducts'
import {getCart} from '../store/cart'
import {me} from '../store/user'

export class Cart extends React.Component {
  async componentDidMount() {
    await this.props.getUser()
    await this.props.getCart()
  }

  render() {
    return <CartProducts cart={this.props.cart} />
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(getCart()),
  getUser: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(Cart)
