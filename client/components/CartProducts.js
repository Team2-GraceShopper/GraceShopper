import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import GridListTile from '@material-ui/core/GridListTile';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'

import {connect} from 'react-redux'

// const products = [
//   {name: 'Product 1', desc: 'A nice thing', price: '$9.99'},
//   {name: 'Product 2', desc: 'Another thing', price: '$3.45'},
//   {name: 'Product 3', desc: 'Something else', price: '$6.51'},
//   {name: 'Product 4', desc: 'Best thing of all', price: '$14.11'},
//   {name: 'Shipping', desc: '', price: 'Free'}
// ]

// const products = [
//   {
//     productId: 1,
//     name: 'Awesome Soft Towels',
//     price: '247.00',
//     description: 'Atque et quas laudantium impedit iste.',
//     imageUrl: 'http://lorempixel.com/640/480/sports',
//     inventory: 84,
//     quantity: 2
//   },
//   {
//     productId: 5,
//     name: 'Sleek Cotton Hat',
//     price: '586.00',
//     description: 'Debitis harum placeat ut debitis quis modi aut.',
//     imageUrl: 'http://lorempixel.com/640/480/nature',
//     inventory: 89,
//     quantity: 4
//   },
//   {
//     productId: 3,
//     name: 'Handmade Plastic Computer',
//     price: '343.00',
//     description:
//       'Nihil eligendi adipisci voluptatem culpa ipsum quis iusto sunt eius.',
//     imageUrl: 'http://lorempixel.com/640/480/abstract',
//     inventory: 75,
//     quantity: 1
//   },
//   {
//     productId: 7,
//     name: 'Rustic Soft Shirt',
//     price: '785.00',
//     description: 'Asperiores est esse corporis dicta.',
//     imageUrl: 'http://lorempixel.com/640/480/food',
//     inventory: 59,
//     quantity: 3
//   },
//   {
//     productId: 2,
//     name: 'Awesome Rubber Mouse',
//     price: '710.00',
//     description: 'Maiores omnis deserunt eos ut alias sed eius maxime.',
//     imageUrl: 'http://lorempixel.com/640/480/food',
//     inventory: 56,
//     quantity: 1
//   },
//   {
//     productId: 66,
//     name: 'Gorgeous Cotton Tuna',
//     price: '880.00',
//     description: 'In minus quia maxime iusto inventore.',
//     imageUrl: 'http://lorempixel.com/640/480/abstract',
//     inventory: 60,
//     quantity: 1
//   }
// ]
// const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
// const payments = [
//   { name: 'Card type', detail: 'Visa' },
//   { name: 'Card holder', detail: 'Mr John Smith' },
//   { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
//   { name: 'Expiry date', detail: '04/2024' },
// ];

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
    paddingRight: 30,
    textAlign: 'center'
  }
}))

export default function CartProducts(props) {
  const classes = useStyles()
  const products = props.cart

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom className={classes.title}>
        Shopping Cart
      </Typography>
      <List disablePadding>
        {products.map(product => (
          <ListItem className={classes.listItem} key={product.name}>
            <img src={product.imageUrl} className={classes.image} />
            {/* <ListItemAvatar className={classes.image}>
               <img src={product.imageUrl} />
            </ListItemAvatar> */}
            <ListItemText
              primary={product.name}
              secondary={product.description}
            />
            <InputLabel id="quantity">Quantity</InputLabel>
            <div className={classes.qty}>
              <Select labelId="quantity" id="select" value="1">
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="22">2</MenuItem>
              </Select>
            </div>
            <Typography variant="body2">{product.price}</Typography>
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
