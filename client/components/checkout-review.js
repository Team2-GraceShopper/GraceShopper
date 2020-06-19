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

export default function Review(props) {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {props.cart.map(product => (
          <ListItem className={classes.listItem} key={product.productId}>
            <ListItemText
              primary={product.name}
              secondary={product.description}
            />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {props.cart.reduce(
              (accum, product) => accum + Number(product.price),
              0
            )}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {props.user.firstName +
              ' ' +
              props.user.lastName +
              ' - ' +
              props.user.email}
          </Typography>
          <Typography gutterBottom>
            {props.user.shipStreet +
              ', ' +
              props.user.shipCity +
              ', ' +
              props.user.shipState +
              ', ' +
              props.user.shipZip}
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
                {props.user.firstName + ' ' + props.user.lastName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Card Number: </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{props.user.cardNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Expiration Date: </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{props.user.cardExpiration}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
