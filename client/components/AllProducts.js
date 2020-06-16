import React from 'react'
import AllProductsRender from './AllProductsRender'
import {getProducts} from '../store/products'
import {connect} from 'react-redux'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return <AllProductsRender products={this.props.products} />
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(getProducts())
  }
}
export default connect(mapState, mapDispatch)(AllProducts)
