import React from 'react'
import AllProductsRender from './AllProductsRender'
import {getProducts} from '../store/products'
import {addItem, getCart} from '../store/cart'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Loader from './Loader'

export class AllProducts extends React.Component {
  componentDidMount() {
    if (process.env.NODE_ENV !== 'test') {
      this.props.getProducts(this.props.match.params.categoryId)
      this.props.getCart()
    }
  }

  render() {
    return this.props.products.length === 0 ? (
      <Loader />
    ) : (
      <AllProductsRender
        products={this.props.products ? this.props.products : []}
        addItem={this.props.addItem}
        categoryId={this.props.match.params.categoryId}
      />
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: categoryId => dispatch(getProducts(categoryId)),
    getCart: () => dispatch(getCart()),
    addItem: (product, quantity) => dispatch(addItem(product, quantity))
  }
}

export default withRouter(connect(mapState, mapDispatch)(AllProducts))
