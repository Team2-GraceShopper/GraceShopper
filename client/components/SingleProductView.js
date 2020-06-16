import React, {Component} from 'react'
import {connect} from 'react-redux'
// import axios from 'axios'
// import {Link} from 'react-router-dom'
// import PropTypes from 'prop-types'
// import {makeStyles} from '@material-ui/core/styles'
// import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
// import IconButton from '@material-ui/core/IconButton'
// import SearchIcon from '@material-ui/icons/Search'
// import Typography from '@material-ui/core/Typography'
// import Link from '@material-ui/core/Link'
//import AllProducts from './AllProducts'

// const useStyles = makeStyles(theme => ({
//   toolbar: {
//     borderBottom: `1px solid ${theme.palette.divider}`
//   },
//   toolbarTitle: {
//     flex: 1,
//     alignSelf: 'center',
//     paddingLeft: '5.5rem'
//   },
//   toolbarSecondary: {
//     justifyContent: 'space-between',
//     overflowX: 'auto'
//   },
//   toolbarLink: {
//     padding: theme.spacing(1),
//     flexShrink: 0
//   }
// }))

class SingleProductView extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  render() {
    let product = this.props.product
    return (
      <div>
        {product && (
          <div>
            <h1>{product.name}</h1>
            <img src={product.imageUrl} />
            <h2>${product.price} </h2>
            <h2>Why You Need It</h2>
            {product.description}
            <h4>Inventory{product.inventory}</h4>
            <Button variant="contained" color="primary">
              ADD TO CART
            </Button>

            <Select variant="outlined" color="primary">
              <Option>1</Option>
              <Option>2</Option>
              <Option>3</Option>
              <Option>4</Option>
              <Option>5</Option>
            </Select>
          </div>
        )}
      </div>
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
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductView)
