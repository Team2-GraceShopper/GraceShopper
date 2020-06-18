import React from 'react'
import CheckoutRender from './checkout-render'
import {connect} from 'react-redux'
import {me, updateUser} from '../store/user'
import {getCart} from '../store/cart'

export class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        shipStreet: '',
        shipCity: '',
        shipState: '',
        shipZip: '',
        cardNumber: 0,
        cardExpiration: '',
        cvvCode: 0
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    // this.props.getUser()
    this.setState({user: this.props.user})
    await this.props.getCart()

    console.log('products in cart:', this.props.cart)
    //load cart info to pass down to checkout-review
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
    console.log(this.state)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    //pass new data into thunk creator to update models
    updateUser(this.state.user)
    console.log('state on submit', this.state)
  }

  render() {
    return (
      <CheckoutRender
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        cart={this.props.cart}
        user={this.state}
      />
    )
  }
}

const mapState = state => {
  return {user: state.user, cart: state.cart}
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    updateUser: user => dispatch(updateUser(user)),
    getCart: () => dispatch(getCart())
  }
}

export default connect(mapState, mapDispatch)(Checkout)
