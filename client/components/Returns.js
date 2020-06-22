import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Accordion from './Accordion'

const useStyles = makeStyles(theme => ({
  caption: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  }
}))

export default function Returns() {
  const classes = useStyles()

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h6" align="center" className={classes.caption}>
          SHIPPING & RETURNS
        </Typography>
        <Accordion
          title="What Is Your Return Policy?"
          content="No Returns Accepted"
        />
        <Accordion
          title="Is Your Package COVID-Free?"
          content="Lysol It Anyways"
        />
        <Accordion
          title="When Can I Expect My Order? "
          content="New policies and procedures to protect the health and safety of our incredible fulfillment team at this time, combined with high order volume, are resulting in slower shipping timelines."
        />
      </Container>
    </React.Fragment>
  )
}
