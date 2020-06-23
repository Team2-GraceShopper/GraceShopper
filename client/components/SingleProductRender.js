import React from 'react'
import {useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {useSnackbar} from 'notistack'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Popover from '@material-ui/core/Popover'

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
  quantityLabel: {
    marginRight: '30px'
  },
  quantity: {
    display: 'flex'
  },
  paper: {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  image: {
    height: '55%'
  },
  img: {
    display: 'inline',
    maxWidth: '75%',
    height: '750px',
    marginRight: 60,
    marginLeft: 40
  },
  right: {
    display: 'flex',
    flexDirection: 'column'
  },
  upright: {
    height: '300px',
    width: '300px',
    maxHeight: '45%'
  },
  typography: {
    padding: theme.spacing(2)
  }
}))

export default function SingleProductView(props) {
  const classes = useStyles()

  let {product, addItem, quantity, handleChange, updateQty, removeItem} = props

  const cartItem = useSelector(state =>
    state.cart.filter(cartProduct => cartProduct.productId === product.id)
  )[0]

  const {enqueueSnackbar} = useSnackbar()

  const handleClick = type => {
    if (type === 'update') {
      updateQty(cartItem.orderId, cartItem.productId, quantity)
      enqueueSnackbar('Cart updated!', {variant: 'success'})
    } else {
      addItem(product, quantity)
      enqueueSnackbar('Item added to cart!', {variant: 'success'})
    }
  }

  // Popover message
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handlePopoverClick = e => {
    e.persist()
    if (e.target.value == 1 || e.target.value == 85) {
      setAnchorEl(e.currentTarget)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return product.name ? (
    <div>
      <Paper className={classes.paper} elevation={0}>
        <Grid item className={classes.img}>
          <img alt="complex" src={product.imageUrl} className={classes.image} />
        </Grid>

        <Grid
          className={classes.right}
          direction="column"
          spacing={2}
          container
        >
          <Grid item xs className={classes.upright}>
            <Typography gutterBottom variant="h5">
              {product.name}
            </Typography>
            <Typography variant="subtitle1">
              {product.price.toLocaleString('en-US', priceFormat)}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Editor's Notes
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {product.description}
            </Typography>
            {cartItem ? (
              <Typography
                component="h6"
                color="primary"
                className={classes.infoChildren}
              >
                In Cart
              </Typography>
            ) : (
              ''
            )}
          </Grid>
          <Grid item>
            <div className={classes.quantity}>
              {!product.inventory ? (
                <Typography component="h6" color="secondary">
                  Out of Stock
                </Typography>
              ) : (
                <div className={classes.quantity}>
                  <Box className={classes.quantity}>
                    <Typography className={classes.quantityLabel}>
                      Quantity:
                    </Typography>
                    <TextField
                      type="number"
                      InputProps={{
                        inputProps: {min: 1, max: product.inventory}
                      }}
                      className={classes.quantityLabel}
                      name="quantity"
                      value={quantity}
                      onChange={handleChange}
                      onClick={handlePopoverClick}
                    />
                    <div>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center'
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center'
                        }}
                      >
                        <Typography className={classes.typography}>
                          Quantity must be between 1 and remaining stock
                        </Typography>
                      </Popover>
                    </div>
                  </Box>
                  {cartItem ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleClick('update')}
                    >
                      UPDATE QUANTITY
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleClick('add')}
                    >
                      ADD TO CART
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  ) : (
    ''
  )
}
