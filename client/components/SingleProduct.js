import React from 'react'
import {connect} from 'react-redux'
import SingleProductRender from './SingleProductRender'
import {fetchSingleProduct} from '../store/singleProduct'
import {addItem} from '../store/cart'
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

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <SingleProductRender
        product={this.props.product}
        addItem={this.props.addItem}
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
    addItem: (id, quantity, price) => dispatch(addItem(id, quantity, price))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
)
