import React from 'react'
import {connect} from 'react-redux'
import CartProducts from './CartProducts'

export class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  render() {
    return <CartProducts cart={this.props.cart} />
  }
}

const mapState = state => ({
  cart: state.cart.cart
})

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(Cart)
