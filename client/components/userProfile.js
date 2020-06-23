import React from 'react'
import UserProfileRender from './UserProfileRender'
import {connect} from 'react-redux'
import {me, updateUser} from '../store/user'

export class UserProfile extends React.Component {
  constructor() {
    super()
    this.state = {
      shipStreet: '',
      shipCity: '',
      shipState: '',
      shipZip: '',
      cardNumber: '',
      cardExpiration: '',
      cvvCode: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.pullData = this.pullData.bind(this)
  }

  async componentDidMount() {
    await this.props.getUser()
    this.setState(this.props.user)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
    console.log(this.state[evt.target.name])
  }

  pullData(key) {
    const saved = {
      shipStreet: this.props.user.shipStreet ? this.props.user.shipStreet : '',
      shipCity: this.props.user.shipCity ? this.props.user.shipCity : '',
      shipState: this.props.user.shipState ? this.props.user.shipState : '',
      shipZip: this.props.user.shipZip ? this.props.user.shipZip : '',
      cardNumber: this.props.user.cardNumber ? this.props.user.cardNumber : '',
      cardExpiration: this.props.user.cardExpiration
        ? this.props.user.cardExpiration
        : ''
    }
    return saved[key]
  }

  handleSubmit(evt) {
    evt.preventDefault()
    console.log('handleSubmit', evt.target)
    let newData = {}
    if (evt.target.name === 'shipping') {
      newData.shipStreet = this.state.shipStreet
      newData.shipCity = this.state.shipCity
      newData.shipState = this.state.shipState
      newData.shipZip = this.state.shipZip
    }
    if (evt.target.name === 'billing') {
      newData.cardNumber = this.state.cardNumber
      newData.cardExpiration = this.state.cardExpiration
      newData.cvvCode = this.state.cvvCode
    }
    console.log('newData: ', newData)
    this.props.updateUser(newData)
  }

  render() {
    return (
      <UserProfileRender
        user={this.state}
        handleChange={this.handleChange}
        pullData={this.pullData}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    updateUser: user => dispatch(updateUser(user))
  }
}

export default connect(mapState, mapDispatch)(UserProfile)
