import React from 'react'
import CheckoutRender from './checkout-render'
import {connect} from 'react-redux'
import {me, updateUser} from '../store/user'
import {getCart} from '../store/cart'
import {updateInventory} from '../store/products'

export class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      shipStreet: '',
      shipCity: '',
      shipState: '',
      shipZip: '',
      cardNumber: 0,
      cardExpiration: '',
      cvvCode: 0,
      saveAddress: false,
      saveBilling: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    await this.props.getUser()
    this.setState(this.props.user)
    // console.log('in checkout', this.state)
    await this.props.getCart()
    console.log('cart', this.props.cart)
  }

  handleClick(evt) {
    evt.persist()
    const name = evt.target.name
    const toggle = this.state[name]
    this.setState({[name]: !toggle})
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt, handleNext) {
    evt.preventDefault()
    handleNext(evt)
    this.props.updateInventory(this.props.cart)
    if (this.state.saveAddress || this.state.saveBilling) {
      let newData = {}
      if (this.state.saveAddress) {
        newData.shipStreet = this.state.shipStreet
        newData.shipCity = this.state.shipCity
        newData.shipState = this.state.shipState
        newData.shipZip = this.state.shipZip
      }
      if (this.state.saveBilling) {
        newData.cardNumber = this.state.cardNumber
        newData.cardExpiration = this.state.cardExpiration
        newData.cvvCode = this.state.cvvCode
      }
      this.props.updateUser(newData)
    }
    console.log('state on submit', this.state)
  }

  render() {
    return (
      <CheckoutRender
        handleClick={this.handleClick}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        cart={this.props.cart}
        user={this.state}
        // updateUser={updateUser}
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
    getCart: () => dispatch(getCart()),
    updateInventory: cart => dispatch(updateInventory(cart))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
