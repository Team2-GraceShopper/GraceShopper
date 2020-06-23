import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import AddressForm from './address-form'
import PaymentForm from './payment-form'
import Review from './checkout-review'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}))

const steps = ['Shipping address', 'Payment details', 'Review your order']

function getStepContent(
  step,
  handleClick,
  handleChange,
  cart,
  user,
  subtotal,
  tax,
  total
) {
  switch (step) {
    case 0:
      return (
        <AddressForm
          handleClick={handleClick}
          handleChange={handleChange}
          user={user}
        />
      )
    case 1:
      return (
        <PaymentForm
          handleClick={handleClick}
          handleChange={handleChange}
          user={user}
          total={total}
        />
      )
    case 2:
      return (
        <Review
          cart={cart}
          user={user}
          subtotal={subtotal}
          tax={tax}
          total={total}
        />
      )
    default:
      throw new Error('Unknown step')
  }
}

export default function Checkout(props) {
  const {
    handleSubmit,
    handleClick,
    handleChange,
    cart,
    user,
    subtotal,
    tax,
    total
  } = props

  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = evt => {
    evt.preventDefault()
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order!!
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is {user.orderId}. We have emailed your
                  order confirmation to {user.email}, and will send you an
                  update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <form onSubmit={evt => handleSubmit(evt, handleNext)}>
                  {getStepContent(
                    activeStep,
                    handleClick,
                    handleChange,
                    cart,
                    user,
                    subtotal,
                    tax,
                    total
                  )}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    {activeStep !== steps.length - 1 ? (
                      <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={evt => handleNext(evt, user)}
                        className={classes.button}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        //   onClick={handleNext}
                        className={classes.button}
                      >
                        Place Order
                      </Button>
                    )}
                    {/* <p>{activeStep}</p> */}
                  </div>
                </form>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  )
}
