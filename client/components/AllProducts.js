import React from 'react'
import AllProductsRender from './AllProductsRender'
import {getProducts} from '../store/products'
import {addItem} from '../store/cart'
import {connect} from 'react-redux'

export class AllProducts extends React.Component {
  componentDidMount() {
    if (process.env.NODE_ENV !== 'test') {
      this.props.getProducts()
    }
  }

  render() {
    return (
      <AllProductsRender
        products={this.props.products ? this.props.products : []}
        addItem={this.props.addItem}
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
    getProducts: () => dispatch(getProducts()),
    addItem: (product, quantity) => dispatch(addItem(product, quantity))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
