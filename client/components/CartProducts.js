import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import RemoveCircle from '@material-ui/icons/RemoveCircle'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'

const priceFormat = {
  style: 'currency',
  currency: 'USD'
}

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 1),
    // border: '2px solid black',
    borderRadius: 5,
    marginBottom: 20
  },
  total: {
    fontWeight: 700
  },
  title: {
    marginTop: theme.spacing(6),
    textAlign: 'center',
    fontWeight: 700
  },
  image: {
    height: 150,
    width: 200,
    marginRight: 10
  },
  qty: {
    paddingRight: 120,
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'row'
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 20,
    fontWeight: 700
  },
  productPrice: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  quantity: {
    paddingRight: 150
  },
  productQty: {
    paddingRight: 50
  },
  container: {
    paddingRight: 100,
    paddingLeft: 100
  },
  priceHead: {
    paddingRight: 73
  },
  price: {
    width: 30,
    marginRight: 50
  },
  subTotal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  subTotalPrice: {
    marginRight: 10
  },
  subTotalQty: {
    marginRight: 50
  },
  checkout: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 20,
    paddingBottom: 50,
    marginRight: 10
  }
}))

export default function CartProducts(props) {
  const classes = useStyles()
  const {removeItem, updateQty} = props
  const products = props.cart || []
  const cartSubtotal = products
    .reduce((total, currentProduct) => {
      return total + currentProduct.subtotal
    }, 0)
    .toLocaleString('en-US', priceFormat)


  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom className={classes.title}>
        Shopping Cart
      </Typography>
      <Box className={classes.container}>
        <List>
          <ListItem className={classes.heading}>
            <Typography variant="h6" gutterBottom>
              Product
            </Typography>
            <div className={classes.productPrice}>
              <Typography
                variant="h6"
                gutterBottom
                className={classes.quantity}
              >
                Quantity
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                className={classes.priceHead}
              >
                Price
              </Typography>
            </div>
          </ListItem>
        </List>
        <List disablePadding>
          {products.map(product => (
            <ListItem className={classes.listItem} key={product.name}>
              <Link to={`/products/${product.productId}`}>
                <img src={product.imageUrl} className={classes.image} />
              </Link>
              <ListItemText primary={product.name} />
              <div className={classes.qty}>
                <ListItemText
                  primary={product.quantity}
                  className={classes.productQty}
                />
                <ButtonGroup>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={() =>
                      updateQty(
                        product.orderId,
                        product.productId,
                        product.quantity - 1
                      )
                    }
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={() =>
                      updateQty(
                        product.orderId,
                        product.productId,
                        product.quantity + 1
                      )
                    }
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </div>
              <Typography variant="body2" className={classes.price}>
                {product.subtotal.toLocaleString('en-US', priceFormat)}
              </Typography>
              <IconButton
                onClick={() => removeItem(product.orderId, product.productId)}
              >
                <RemoveCircle />
              </IconButton>
            </ListItem>
          ))}
          {/* <ListItem className={classes.listItem}> */}
          {/* <ListItemText primary="Total" /> */}
          <Box className={classes.subTotal}>
            <Typography
              variant="h6"
              className={`${classes.total} ${classes.subTotalQty}`}
            >
              Total
            </Typography>
            <Typography
              variant="h6"
              className={`${classes.total} ${classes.subTotalPrice}`}
            >
              {cartSubtotal}
            </Typography>
          </Box>
          {/* </ListItem> */}
        </List>
        <Box className={classes.checkout}>
          <Button variant="contained" color="primary" size="large">
            Checkout Cart
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  )
}
