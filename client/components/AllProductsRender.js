import React from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import ToggleHeart from './ToggleHeart'
import {useSnackbar} from 'notistack'
import {connect} from 'react-redux'
import {updateQty} from '../store/cart'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

const priceFormat = {
  style: 'currency',
  currency: 'USD'
}

const useStyles = makeStyles(theme => ({
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
  quantityField: {
    border: '1px solid black',
    padding: '3px 10px',
    fontSize: '12px',
    fontFamily: 'Roboto'
  },
  qty: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '8em'
  },
  info: {
    display: 'flex'
  },
  infoChildren: {
    marginRight: '20px'
  }
}))

export function AllProductsRender(props) {
  const {products, addItem, cart, categoryId, updateQty} = props
  const classes = useStyles()

  const {enqueueSnackbar} = useSnackbar()

  const inCart = product => {
    let alreadyExist = false
    cart.forEach(item => {
      if (item.productId === product.id) {
        alreadyExist = true
      }
    })
    return alreadyExist
  }

  let quantity

  const showQty = product => {
    const cartItem = cart.filter(item => item.productId === product.id)
    return cartItem[0].quantity
  }

  const handleAdd = product => {
    addItem(product, 1)
    enqueueSnackbar('Item added to cart!', {variant: 'success'})
  }

  const handleInc = product => {
    quantity = showQty(product)
    if (product.inventory >= quantity + 1) {
      updateQty(cart[0].orderId, product.id, quantity + 1)
      enqueueSnackbar('Increased quantity', {variant: 'success'})
    } else {
      enqueueSnackbar('Out of stock!', {variant: 'warning'})
    }
  }

  const handleDec = product => {
    quantity = showQty(product)
    if (quantity === 1) {
      enqueueSnackbar('To remove, please go to cart', {variant: 'Info'})
    } else if (product.inventory >= quantity - 1) {
      updateQty(cart[0].orderId, product.id, quantity - 1)
      enqueueSnackbar('Decreased quantity', {variant: 'success'})
    } else {
      enqueueSnackbar('Out of stock!', {variant: 'warning'})
    }
  }

  const categories = {
    1: 'Feeling Lonely? Buy New Friends.',
    2: 'Delicacies Around The World',
    3: 'Stay Extra Safe With These Baddies',
    4: 'Got Free Time? Learn Something Useful',
    5: 'Strictly Entertainment Zone',
    6: 'Reminder To Love Yourself',
    7: 'Pandemic Essentials à la 2020'
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {categoryId ? (
          <div className={classes.heroContent}>
            <Typography
              component="h5"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {categories[categoryId]}
            </Typography>
          </div>
        ) : (
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Featured Item
              </Typography>
              <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
              />
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Featured item description
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={1} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      See product
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
        )}
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {products.map(product => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={product.imageUrl}
                    alt={`this is a picture of ${product.imageUrl}`}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom component="h6">
                      {product.name}
                    </Typography>
                    <Typography gutterBottom component="h6">
                      {product.price.toLocaleString('en-US', priceFormat)}
                    </Typography>
                    <div className={classes.info}>
                      {inCart(product) && showQty(product) ? (
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
                      {!product.inventory ? (
                        <Typography
                          component="h6"
                          color="secondary"
                          className={classes.infoChildren}
                        >
                          Out of Stock
                        </Typography>
                      ) : (
                        ''
                      )}
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      href={`/products/${product.id}`}
                    >
                      View
                    </Button>
                    {inCart(product) && showQty(product) ? (
                      <div className={classes.qty}>
                        <RemoveIcon
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            handleDec(product)
                          }}
                        />
                        <div className={classes.quantityField}>
                          {showQty(product)}
                        </div>
                        <AddIcon
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            handleInc(product)
                          }}
                        />
                      </div>
                    ) : (
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleAdd(product)}
                      >
                        Add To Cart
                      </Button>
                    )}
                    <ToggleHeart />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  )
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  updateQty: (orderId, productId, quantity) =>
    dispatch(updateQty(orderId, productId, quantity))
})

export default connect(mapState, mapDispatch)(AllProductsRender)
