import React from 'react'
import CheckoutRender from './checkout-render'
import {connect} from 'react-redux'
import {me, updateUser} from '../store/user'
import {getCart, updateOrder} from '../store/cart'
import {updateInventory} from '../store/products'

const stateTaxes = {
  AL: 13.5,
  AK: 7,
  AZ: 10.725,
  AR: 11.625,
  CA: 10.5,
  CO: 10,
  CT: 6.35,
  DC: 5.75,
  DE: 0,
  FL: 5.75,
  GA: 8,
  HI: 4.712,
  ID: 8.5,
  IL: 10.25,
  IN: 7,
  IA: 7,
  KS: 11.5,
  KY: 6,
  LA: 11.45,
  ME: 5.5,
  MD: 6,
  MA: 6.25,
  MI: 6,
  MN: 7.875,
  MS: 7.25,
  MO: 10.85,
  MT: 0,
  NE: 7.5,
  NV: 8.25,
  NH: 0,
  NJ: 12.625,
  NM: 8.688,
  NY: 8.875,
  NC: 7.5,
  ND: 8.0,
  OH: 8.0,
  OK: 11.0,
  OR: 0,
  PA: 8,
  RI: 7,
  SC: 9,
  SD: 6,
  TN: 9.75,
  TX: 8.25,
  UT: 8.35,
  VT: 7,
  VA: 6,
  WA: 10.4,
  WV: 7,
  WI: 6.75,
  WY: 6
}

const isValidState = state => {
  if (state === null) return false
  if (typeof stateTaxes[state.toUpperCase()] === 'number') return true
  else return false
}

const getSubtotal = cart => {
  const subtotal = cart.reduce(
    (accum, product) => accum + Number(product.price),
    0
  )
  return subtotal
}

const getTax = (subtotal, state) => {
  let tax = 0
  if (state === null) tax = 5
  else {
    let percent = stateTaxes[state.toUpperCase()] / 100
    tax += subtotal * percent
  }
  return tax
}

export class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      id: '',
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
      saveBilling: false,
      orderId: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    const loggedIn = await this.props.getUser()
    this.setState(loggedIn)
    await this.props.getCart()
    this.setState({orderId: this.props.cart[0].orderId})

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

  handleSubmit = (evt, handleNext) => {
    evt.preventDefault()
    handleNext(evt)
    window.localStorage.removeItem('cart')
    this.props.updateInventory(this.props.cart)
    let updatedOrder = {
      id: this.props.cart[0].orderId,
      email: this.state.email,
      subTotal: getSubtotal(this.props.cart),
      tax: isValidState(this.state.shipState)
        ? getTax(getSubtotal(this.props.cart), this.state.shipState)
        : 5,
      total: isValidState(this.state.shipState)
        ? getSubtotal(this.props.cart) +
          getTax(getSubtotal(this.props.cart), this.state.shipState)
        : getSubtotal(this.props.cart) + 5,
      shipStreet: this.state.shipStreet,
      shipCity: this.state.shipCity,
      shipState: this.state.shipState,
      shipZip: this.state.shipZip,
      cardNumber: this.state.cardNumber,
      cardExpiration: this.state.cardExpiration,
      cvvCode: this.state.cvvCode
    }
    if (this.state.saveAddress) {
      let newData = {}
      newData.shipStreet = this.state.shipStreet
      newData.shipCity = this.state.shipCity
      newData.shipState = this.state.shipState
      newData.shipZip = this.state.shipZip
      this.props.updateUser(newData)
    }
    this.props.updateOrder(updatedOrder)
  }

  render() {
    return (
      <CheckoutRender
        handleClick={this.handleClick}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        cart={this.props.cart}
        user={this.state}
        subtotal={getSubtotal(this.props.cart)}
        tax={
          isValidState(this.state.shipState)
            ? getTax(getSubtotal(this.props.cart), this.state.shipState)
            : 5
        }
        total={
          isValidState(this.state.shipState)
            ? getSubtotal(this.props.cart) +
              getTax(getSubtotal(this.props.cart), this.state.shipState)
            : getSubtotal(this.props.cart) + 5
        }
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
    updateInventory: cart => dispatch(updateInventory(cart)),
    updateOrder: updatedOrder => dispatch(updateOrder(updatedOrder))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
