import React from 'react'
import {useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import {useSnackbar} from 'notistack'
import Box from '@material-ui/core/Box'

const priceFormat = {
  style: 'currency',
  currency: 'USD'
}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  quantityField: {
    border: '1px solid black',
    fontSize: '16px',
    marginRight: 50,
    padding: 10,
    fontFamily: 'Roboto'
  },
  quantity: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 40
  }
}))

export default function SingleProductView(props) {
  const classes = useStyles()

  let {product, addItem, handleChange, quantity, updateQty} = props

  const cartItem = useSelector(state =>
    state.cart.filter(cartProduct => cartProduct.productId === product.id)
  )[0]

  const {enqueueSnackbar} = useSnackbar()

  const handleClick = type => {
    if (type === 'update') {
      enqueueSnackbar('Cart updated!')
    } else {
      enqueueSnackbar('Item added to cart!')
    }
  }

  return product.name ? (
    <div className="single-product">
      <h1> {product.name}</h1>
      <img src={product.imageUrl} />
      <h2>{product.price.toLocaleString('en-US', priceFormat)} </h2>
      <h2>Editor's Notes</h2>
      {product.description}
      <h4> Only a few left!</h4>

      <div className={classes.quantity}>
        <Box className={classes.quantity}>
          <div className={classes.quantityField}>{quantity}</div>
          <ButtonGroup>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() =>
                handleChange({target: {name: 'quantity', value: quantity - 1}})
              }
            >
              <RemoveIcon fontSize="small" />
            </Button>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() =>
                handleChange({target: {name: 'quantity', value: quantity + 1}})
              }
            >
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </Box>
        {cartItem ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              updateQty(cartItem.orderId, cartItem.productId, quantity)
              handleClick('update')
            }}
          >
            UPDATE QUANTITY
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              addItem(product, quantity)
              handleClick('add')
            }}
          >
            ADD TO CART
          </Button>
        )}
      </div>
    </div>
  ) : (
    ''
  )
}
