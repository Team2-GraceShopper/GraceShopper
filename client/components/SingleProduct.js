import React from 'react'
import {connect} from 'react-redux'
import SingleProductRender from './SingleProductRender'
import {fetchSingleProduct} from '../store/singleProduct'
import {addItem, updateQty, getCart} from '../store/cart'
import {me} from '../store/user'
import {withRouter} from 'react-router-dom'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      quantity: 1
    }
  }

  async componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
    await this.props.getUser()
    await this.props.getCart()

    if (this.props.cartProduct)
      this.setState({quantity: this.props.cartProduct.quantity})
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({
      quantity: e.target.value
    })
  }

  render() {
    console.log('cart product from single product', this.state.cart)

    return (
      <SingleProductRender
        product={this.props.product}
        addItem={this.props.addItem}
        updateQty={this.props.updateQty}
        quantity={this.state.quantity}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    addItem: (id, quantity, price) => dispatch(addItem(id, quantity, price)),
    updateQty: (orderId, productId, quantity) =>
      dispatch(updateQty(orderId, productId, quantity)),
    getCart: () => dispatch(getCart()),
    getUser: () => dispatch(me())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
)
