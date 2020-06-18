import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 1)
    // border: "1px solid black",
  },
  total: {
    fontWeight: 700
  },
  title: {
    marginTop: theme.spacing(2),
    textAlign: 'center'
  },
  image: {
    height: 150,
    width: 200,
    marginRight: 10
  },
  qty: {
    paddingRight: 70,
    textAlign: 'center'
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 20
  },
  productPrice: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  quantity: {
    paddingRight: 60
  }
}))

export default function CartProducts(props) {
  const classes = useStyles()
  const products = props.cart || []

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom className={classes.title}>
        Shopping Cart
      </Typography>
      <List>
        <ListItem className={classes.heading}>
          <ListItemText primary="Product" />
          <div className={classes.productPrice}>
            <ListItemText primary="Quantity" className={classes.quantity} />
            <ListItemText primary="Total" />
          </div>
        </ListItem>
      </List>
      <List disablePadding>
        {products.map(product => (
          <ListItem className={classes.listItem} key={product.name}>
            <img src={product.imageUrl} className={classes.image} />
            <ListItemText
              primary={product.name}
              // secondary={product.description}
            />
            {/* <InputLabel id="quantity" className={classes.listItem}>Quantity</InputLabel> */}
            <div className={classes.qty}>
              <Select labelId="quantity" id="select" value="1">
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="22">2</MenuItem>
              </Select>
            </div>
            <Typography variant="body2">{`${product.subtotal}.00`}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        {/* <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid> */}
      </Grid>
    </React.Fragment>
  )
}
