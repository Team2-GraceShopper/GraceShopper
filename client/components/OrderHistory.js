import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {getOrders} from '../store/orderhistory'
import OrderHistoryRender from './OrderHistoryRender'

export class OrderHistory extends React.Component {
  async componentDidMount() {
    await this.props.getUser()
    await this.props.getOrders()
  }

  render() {
    return <OrderHistoryRender history={this.props.history} />
  }
}

const mapState = state => ({
  orders: state.orderHistory
})

const mapDispatch = dispatch => ({
  getUser: () => dispatch(me()),
  getOrders: () => dispatch(getOrders())
})

export default connect(mapState, mapDispatch)(OrderHistory)
