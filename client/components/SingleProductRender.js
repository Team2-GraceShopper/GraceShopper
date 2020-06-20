import React from 'react'
import {useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Box from '@material-ui/core/Box'

// import CardActions from '@material-ui/core/CardActions'
// import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
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
  let {
    product,
    addItem,
    handleSubmit,
    handleChange,
    quantity,
    updateQty
  } = props

  const cartItem = useSelector(state =>
    state.cart.filter(cartProduct => cartProduct.productId === product.id)
  )[0]

  return product.name ? (
    <div className="single-product">
      <h1> {product.name}</h1>
      <img src={product.imageUrl} />
      <h2>${product.price} </h2>
      <h2>Editor's Notes</h2>
      {product.description}
      <h4> Only a few left!</h4>

      <div className={classes.quantity}>
        {/* <form onSubmit={handleSubmit}> */}
        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" shrink="true" value="1" className={classes.quantityField}/> */}
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

        {/* <select
          variant="outlined"
          name="quantity"
          color="primary"
          onChange={handleChange}
          value={quantity}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select> */}

        {/* </form> */}
        {cartItem ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              updateQty(cartItem.orderId, cartItem.productId, quantity)
            }
          >
            UPDATE QUANTITY
          </Button>
        ) : (
          <Button
            // type="submit"
            variant="contained"
            color="primary"
            onClick={() => addItem(product, quantity)}
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
