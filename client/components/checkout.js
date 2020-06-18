import React from 'react'
import CheckoutRender from './checkout-render'
import {connect} from 'react-redux'
import {me, updateUser} from '../store/user'

export class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
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

  componentDidMount() {
    this.props.getUser()
    this.setState({user: this.props.user})
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    //pass new data into updateData thunk creator to update User
    //update Order with new data and toggle status
    updateUser(this.state.user)
  }

  render() {
    return (
      <CheckoutRender
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

const mapState = state => {
  return {user: state.user}
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    updateUser: user => dispatch(updateUser(user))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
