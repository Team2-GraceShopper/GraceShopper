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
import Grid from '@material-ui/core/Grid'

const priceFormat = {
  style: 'currency',
  currency: 'USD'
}

const addresses = [
  '1 Material-UI Drive',
  'Reactville',
  'Anytown',
  '99999',
  'USA'
]

const payments = [
  {name: 'Card type', detail: 'Visa'},
  {name: 'Card holder', detail: 'Mr John Smith'},
  {name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234'},
  {name: 'Expiry date', detail: '04/2024'}
]

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 1),
    // border: '2px solid black',
    borderRadius: 5,
    marginBottom: 20
  },
  totalItem: {
    fontWeight: 700,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 200
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
    paddingRight: 90
  },
  container: {
    paddingRight: 100,
    paddingLeft: 100
  },
  price: {
    width: 30
  },
  totals: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  subtotalItemPrice: {
    marginRight: 10
  },
  totalsLabel: {
    marginRight: 50
  },
  checkout: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 20,
    paddingBottom: 50,
    marginRight: 10
  },
  detailsContainer: {
    width: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 250,
    padding: 0
  },
  details: {
    paddingRight: 50
  }
}))

export default function OrderHistoryDetailRender(props) {
  const classes = useStyles()
  const products = props.order ? props.order.products : []
  const order = props.order || {}
  console.log(order)
  const total = order.total || 0
  const subtotal = order.subtotal || 0
  const tax = order.tax || 0
  const cardNumber = order.cardNumber || 'XXXX'
  const expiry = order.cardExpiration || ''

  function calculateSubtotalItem(price, quantity) {
    return price * quantity
  }

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom className={classes.title}>
        Order Details
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
              <Typography variant="h6" gutterBottom>
                Total
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
                  primary={product.OrderDetail.quantity}
                  className={classes.productQty}
                />
              </div>
              <Typography variant="body1" className={classes.price}>
                {calculateSubtotalItem(
                  product.OrderDetail.price,
                  product.OrderDetail.quantity
                ).toLocaleString('en-US', priceFormat)}
              </Typography>
            </ListItem>
          ))}

          <Box className={classes.totals}>
            <Box className={classes.totalItem}>
              <Typography variant="body1" className={`${classes.totalsLabel}`}>
                Subtotal
              </Typography>
              <Typography
                variant="body1"
                className={`${classes.subtotalItemPrice}`}
              >
                {subtotal.toLocaleString('en-US', priceFormat)}
              </Typography>
            </Box>
            <Box className={classes.totalItem}>
              <Typography variant="body1" className={`${classes.totalsLabel}`}>
                Tax
              </Typography>
              <Typography
                variant="body1"
                className={`${classes.subtotalItemPrice}`}
              >
                {tax.toLocaleString('en-US', priceFormat)}
              </Typography>
            </Box>
            <Box className={classes.totalItem}>
              <Typography variant="h6" className={`${classes.totalsLabel}`}>
                Total
              </Typography>
              <Typography
                variant="h6"
                className={`${classes.subtotalItemPrice}`}
              >
                {total.toLocaleString('en-US', priceFormat)}
              </Typography>
            </Box>
          </Box>
        </List>

        <Grid container spacing={2} className={classes.detailsContainer}>
          <Grid
            item
            container
            direction="column"
            xs={12}
            sm={6}
            className={classes.details}
          >
            <Typography variant="h6" gutterBottom className={classes.title}>
              Shipping & Contact
            </Typography>
            <Grid container>
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>Contact Email</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{order.email}</Typography>
                </Grid>
              </React.Fragment>

              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>Shipping Address</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{order.shipStreet}</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom />
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{`${order.shipCity}, ${
                    order.shipState
                  } ${order.shipZip}`}</Typography>
                </Grid>
              </React.Fragment>
            </Grid>
          </Grid>

          <Grid item container direction="column" xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Payment details
            </Typography>
            <Grid container>
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card Number</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{`XXXX-XXXX-XXXX-${cardNumber.substr(
                    -4
                  )}`}</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card Expiration</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{expiry}</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>Billing Address</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{order.billStreet}</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom />
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{`${order.billCity}, ${
                    order.billState
                  } ${order.billZip}`}</Typography>
                </Grid>
              </React.Fragment>
            </Grid>
          </Grid>
        </Grid>
        {/* "billCity": "Lake Derekbury",
        "billState": "Alaska",
        "billZip": 40789, */}

        {/*
      const priceFormat = {
  style: 'currency',
  currency: 'USD'
}

const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];

const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
]; */}

        {/* </Grid> */}
        {/* <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography> */}

        {/* <Grid container>
            payment details
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
 */}

        {/* ))} */}
        {/* <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>Email</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{order.email}</Typography>
                </Grid>
              </React.Fragment>
          </Grid>
        </Grid>
      </Grid> */}
      </Box>

      {/* <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name}  />
            <Typography variant="body2">{product.OrderDetail.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="totalItem" />
          <Typography variant="subtitle1" className={classes.totalItem}>
            {/* {order.totalItem} */}
      {/* order totalItem
          </Typography> */}
      {/* </ListItem>
      </List> */}
    </React.Fragment>
  )
}
