import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
// import StripeCheckout from 'react-stripe-checkout'
// import STRIPE_PUBLISHABLE from './constants/stripe'
// import PAYMENT_SERVER_URL from './constants/server'
// import axios from 'axios'

// const CURRENCY = 'USD';
// const fromDollarToCent = amount => amount * 100;
// const description = 'card payment'

// const successPayment = data => {
//   alert('Payment Successful');
// };

// const errorPayment = data => {
//   alert('Payment Error');
// };

// const onToken = (amount, description) => token =>
//   axios.post(PAYMENT_SERVER_URL,
//     {
//       description,
//       source: token.id,
//       currency: CURRENCY,
//       amount: fromDollarToCent(amount)
//     })
//     .then(successPayment)
//     .catch(errorPayment);

export default function PaymentForm(props) {
  const {handleChange, handleClick, user, total} = props
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        {/* <Grid item xs={12} >
      <StripeCheckout
        name={name}
        description={description}
        amount={fromEuroToCent(total)}
        token={onToken(total, description)}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
      />
        </Grid> */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            name="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            value={user.cardNumber ? user.cardNumber : ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            name="cardExpiration"
            label="Expiration date (YYYY-MM-DD)"
            fullWidth
            autoComplete="cc-exp"
            value={user.cardExpiration ? user.cardExpiration : ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="cvvCode"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            value={user.cvvCode ? user.cvvCode : ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          {user.id ? (
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  name="saveBilling"
                  value={user.saveBilling}
                  onChange={handleClick}
                />
              }
              label="Remember credit card details for next time"
            />
          ) : (
            <br />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
