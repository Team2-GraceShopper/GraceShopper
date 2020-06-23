import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {getOrders} from '../store/orderhistory'
import OrderHistoryDetailRender from './OrderHistoryDetailRender'

export class OrderHistory extends React.Component {
  async componentDidMount() {
    await this.props.getUser()
    await this.props.getOrders()
  }

  render() {
    return <OrderHistoryDetailRender order={this.props.order} />
  }
}

const mapState = (state, ownProps) => {
  const orderId = ownProps.match.params.orderId
  return {
    order: state.orderHistory.find(order => order.id === parseInt(orderId))
  }
}

const mapDispatch = dispatch => ({
  getUser: () => dispatch(me()),
  getOrders: () => dispatch(getOrders())
})

export default connect(mapState, mapDispatch)(OrderHistory)
