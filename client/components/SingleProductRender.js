import React from 'react'
// import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

// const useStyles = makeStyles(theme => ({
//     toolbar: {
//       borderBottom: `1px solid ${theme.palette.divider}`
//     },
//     toolbarTitle: {
//       flex: 1,
//       alignSelf: 'center',
//       paddingLeft: '5.5rem'
//     },
//     toolbarSecondary: {
//       justifyContent: 'space-between',
//       overflowX: 'auto'
//     },
//     toolbarLink: {
//       padding: theme.spacing(1),
//       flexShrink: 0
//     }
//   }))

export default function SingleProductView(props) {
  // const classes = useStyles()
  let {product} = props
  return product.name ? (
    <div className="single-product">
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
  ) : (
    ''
  )
}
