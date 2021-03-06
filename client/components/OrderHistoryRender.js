import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import {useSelector} from 'react-redux'
import ListItemText from '@material-ui/core/ListItemText'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

const priceFormat = {
  style: 'currency',
  currency: 'USD'
}

function formatDate(date) {
  const [year, month, day] = date.split('-')
  return month + '/' + day + '/' + year
}

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 1),
    borderRadius: 5,
    marginBottom: 20
  },
  title: {
    marginTop: theme.spacing(6),
    textAlign: 'center',
    fontWeight: 700
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 20,
    fontWeight: 700
  },
  container: {
    paddingRight: 200,
    paddingLeft: 200
  },
  priceAndView: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  price: {
    marginRight: 120
  },
  total: {
    marginRight: 230
  }
}))

export default function OrderHistoryRender(props) {
  const classes = useStyles()
  const {history} = props
  const orders = useSelector(state => state.orderHistory)

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom className={classes.title}>
        Order History
      </Typography>
      <Box className={classes.container}>
        <List>
          <ListItem className={classes.heading}>
            <Typography variant="h6" gutterBottom>
              Order Date
            </Typography>
            <div className={classes.total}>
              <Typography variant="h6" gutterBottom>
                Total
              </Typography>
            </div>
          </ListItem>
        </List>
        <List disablePadding>
          {orders.map(order => (
            <ListItem className={classes.listItem} key={order.id}>
              <ListItemText primary={formatDate(order.orderDate)} />
              <Box className={classes.priceAndView}>
                <Typography variant="body2" className={classes.price}>
                  {order.total.toLocaleString('en-US', priceFormat)}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push(`/orderHistory/${order.id}`)}
                >
                  View Order
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </React.Fragment>
  )
}
