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

// const stateTaxes = {
//   AL: 13.5,
//   AK: 7,
//   AZ: 10.725,
//   AR: 11.625,
//   CA: 10.5,
//   CO: 10,
//   CT: 6.35,
//   DC: 5.75,
//   DE: 0,
//   FL: 5.75,
//   GA: 8,
//   HI: 4.712,
//   ID: 8.5,
//   IL: 10.25,
//   IN: 7,
//   IA: 7,
//   KS: 11.5,
//   KY: 6,
//   LA: 11.45,
//   ME: 5.5,
//   MD: 6,
//   MA: 6.25,
//   MI: 6,
//   MN: 7.875,
//   MS: 7.25,
//   MO: 10.85,
//   MT: 0,
//   NE: 7.5,
//   NV: 8.25,
//   NH: 0,
//   NJ: 12.625,
//   NM: 8.688,
//   NY: 8.875,
//   NC: 7.5,
//   ND: 8.0,
//   OH: 8.0,
//   OK: 11.0,
//   OR: 0,
//   PA: 8,
//   RI: 7,
//   SC: 9,
//   SD: 6,
//   TN: 9.75,
//   TX: 8.25,
//   UT: 8.35,
//   VT: 7,
//   VA: 6,
//   WA: 10.4,
//   WV: 7,
//   WI: 6.75,
//   WY: 6
// }

// const isValidState = state => {
//   console.log('valide state?', state)
//   if (typeof stateTaxes[state.toUpperCase()] === 'number') return true
//   else return false
// }

// const getSubtotal = cart => {
//   const subtotal = cart.reduce(
//     (accum, product) => accum + Number(product.price),
//     0
//   )
//   return subtotal
// }

// const getTax = (subtotal, state) => {
//   console.log('state tax: ', stateTaxes[state.toUpperCase()])
//   let percent = stateTaxes[state.toUpperCase()] / 100
//   let tax = 0
//   tax += subtotal * percent
//   console.log('tax', tax)
//   return tax
// }

export default function Review(props) {
  const {cart, user, subtotal, tax, total} = props
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
            {subtotal.toLocaleString('en-US', priceFormat)}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="State Tax" />
          <Typography variant="subtitle1" className={classes.total}>
            {tax.toLocaleString('en-US', priceFormat)}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {total.toLocaleString('en-US', priceFormat)}
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
