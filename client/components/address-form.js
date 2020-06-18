import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export default function AddressForm(props) {
  const {handleChange} = props
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            onChange={handleChange}
            value={props.user.firstName ? props.user.firstName : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            value={props.user.lastName ? props.user.lastName : ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            value={props.user.email ? props.user.email : ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="shipStreet"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line2"
            value={props.user.shipStreet ? props.user.shipStreet : ''}
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
            value={props.user.shipCity ? props.user.shipCity : ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="state"
            name="shipState"
            label="State/Province/Region"
            value={props.user.shipState ? props.user.shipState : ''}
            onChange={handleChange}
            fullWidth
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
            value={props.user.shipZip ? props.user.shipZip : ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="saveAddress"
                value="yes"
                onChange={console.log('checked')}
              />
            }
            label="Remember shipping details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
