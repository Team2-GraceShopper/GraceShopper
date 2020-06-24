import React from 'react'
import {connect} from 'react-redux'
import SingleProductRender from './SingleProductRender'
import {fetchSingleProduct} from '../store/singleProduct'
import {addItem, updateQty, removeItem, getCart} from '../store/cart'
import {me} from '../store/user'
import {withRouter} from 'react-router-dom'
import Loader from './Loader'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      quantity: 1,
      isLoaded: false
    }
  }

  async componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
    await this.props.getUser()
    await this.props.getCart()

    const cartItem = this.props.cart.filter(
      items => items.productId === this.props.product.id
    )[0]

    if (cartItem) {
      this.setState({quantity: cartItem.quantity})
    }
    this.setState({isLoaded: true})
  }

  handleChange(e) {
    if (e.target.value <= this.props.product.inventory) {
      this.setState({[e.target.name]: e.target.value})
    }
  }

  render() {
    return !this.state.isLoaded ? (
      <Loader />
    ) : (
      <SingleProductRender
        product={this.props.product}
        addItem={this.props.addItem}
        removeItem={this.props.removeItem}
        updateQty={this.props.updateQty}
        quantity={this.state.quantity}
        handleChange={this.handleChange}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.product,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    addItem: (id, quantity, price) => dispatch(addItem(id, quantity, price)),
    removeItem: (orderId, productId) =>
      dispatch(removeItem(orderId, productId)),
    updateQty: (orderId, productId, quantity) =>
      dispatch(updateQty(orderId, productId, quantity)),
    getCart: () => dispatch(getCart()),
    getUser: () => dispatch(me())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
)
