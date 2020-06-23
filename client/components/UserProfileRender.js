import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function UserProfileRender(props) {
  const {handleSubmit, handleChange, pullData} = props
  return (
    <div id="profileContainer">
      <React.Fragment>
        <div id="profileTitle">
          <Typography variant="h6" gutterBottom>
            Your Profile
          </Typography>
        </div>
        <div className="updateContainer">
          <Typography variant="h6" gutterBottom>
            Shipping Information
          </Typography>
          <Typography>Saved shipping address:</Typography>
          <Typography variant="subtitle1">
            {pullData('shipStreet')
              ? pullData('shipStreet') +
                ', ' +
                pullData('shipCity') +
                ', ' +
                pullData('shipState') +
                ', ' +
                pullData('shipZip')
              : 'No saved shipping address belonging to this account'}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="shipStreet"
                label="Address line 1"
                fullWidth
                autoComplete="shipping address-line1"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="shipCity"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="shipState"
                label="State/Province/Region"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="shipZip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit} name="shipping">
                <Button
                  size="small"
                  color="primary"
                  type="submit"
                  variant="outlined"
                >
                  Update
                </Button>
              </form>
            </Grid>
          </Grid>
        </div>
        <div className="updateContainer">
          <Typography variant="h6" gutterBottom>
            Billing Information
          </Typography>
          <Typography>Saved credit card:</Typography>
          <Typography variant="subtitle1">
            {pullData('cardNumber')
              ? pullData('cardNumber') +
                ', Expiration Date: ' +
                pullData('cardExpiration')
              : 'No saved credit card belonging to this account'}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="cardNumber"
                name="cardNumber"
                label="Card Number"
                fullWidth
                autoComplete="cardNumber"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="cardExpiration"
                name="cardExpiration"
                label="Date of Expiration (YYYY-MM-DD)"
                fullWidth
                autoComplete="cardExpiration"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="cvvCode"
                name="cvvCode"
                label="CVV Code"
                fullWidth
                autoComplete="cvvCode"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit} name="billing">
                <Button
                  size="small"
                  color="primary"
                  type="submit"
                  variant="outlined"
                >
                  Update
                </Button>
              </form>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    </div>
  )
}
