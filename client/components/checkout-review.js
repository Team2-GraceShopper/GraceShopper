import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: 700
  },
  title: {
    marginTop: theme.spacing(2)
  }
}))

const priceFormat = {
  style: 'currency',
  currency: 'USD'
}

export default function Review(props) {
  const {cart, user} = props
  const classes = useStyles()
  //   console.log('in checkout-review', cart)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map(product => (
          <ListItem className={classes.listItem} key={product.productId}>
            <ListItemText
              primary={
                product.quantity > 1
                  ? product.name +
                    ' x ' +
                    product.quantity +
                    ' (' +
                    product.price.toLocaleString('en-US', priceFormat) +
                    ')'
                  : product.name
              }
              secondary={product.description}
            />
            <Typography variant="body2">
              {(product.price * product.quantity).toLocaleString(
                'en-US',
                priceFormat
              )}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Subotal" />
          <Typography variant="subtitle1" className={classes.total}>
            {cart
              .reduce((accum, product) => accum + Number(product.price), 0)
              .toLocaleString('en-US', priceFormat)}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Tax" />
          <Typography variant="subtitle1" className={classes.total}>
            $5.00
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {(
              cart.reduce(
                (accum, product) => accum + Number(product.price),
                0
              ) + 5
            ).toLocaleString('en-US', priceFormat)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {user.firstName + ' ' + user.lastName + ' - ' + user.email}
          </Typography>
          <Typography gutterBottom>
            {user.shipStreet +
              ', ' +
              user.shipCity +
              ', ' +
              user.shipState +
              ', ' +
              user.shipZip}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>Name on Card: </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {user.firstName + ' ' + user.lastName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Card Number: </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{user.cardNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Expiration Date: </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{user.cardExpiration}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
