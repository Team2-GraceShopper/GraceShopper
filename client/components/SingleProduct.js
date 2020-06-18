import React from 'react'
import {connect} from 'react-redux'
import SingleProductRender from './SingleProductRender'
import {fetchSingleProduct} from '../store/singleProduct'
import {withRouter} from 'react-router-dom'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  render() {
    return <SingleProductRender product={this.props.product} />
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
)
