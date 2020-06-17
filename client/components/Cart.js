import React from 'react'
import {connect} from 'react-redux'
import CartProducts from './CartProducts'

export default class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  render() {
    return <CartProducts />
  }
}

const mapState = state => ({})

const mapDispatch = dispatch => ({})

connect(mapState, mapDispatch)(Cart)
