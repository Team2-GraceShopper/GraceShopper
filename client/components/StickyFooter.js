import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import Copyright from './Copyright'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(3, 2),
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800]
  },
  links: {
    justifyContent: 'space-between',
    overflowX: 'auto',
    marginRight: theme.spacing(8),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2)
  }
}))

export function StickyFooter() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1" align="center" className={classes.links}>
            <Link href="/about" color="textSecondary" className={classes.links}>
              About Us
            </Link>{' '}
            <Link
              href="/returns"
              color="textSecondary"
              className={classes.links}
            >
              Shipping & Returns
            </Link>{' '}
            <Link
              href="/contactus"
              color="textSecondary"
              align="right"
              marginleft="theme.spacing(6)"
            >
              Contact Us
            </Link>
          </Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  )
}

export default StickyFooter
