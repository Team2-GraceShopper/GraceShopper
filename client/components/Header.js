import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import {logout} from '../store/user'
import {connect} from 'react-redux'

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1,
    alignSelf: 'center',
    paddingLeft: '5.5rem'
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto'
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  }
}))

export function Header(props) {
  const classes = useStyles()
  // const { sections, title } = props;
  const title = 'Website Title'
  const categories = [
    {
      title: 'Category1',
      url: 'http://www.google.com'
    },
    {
      title: 'Category2',
      url: 'http://www.google.com'
    },
    {
      title: 'Category3',
      url: 'http://www.google.com'
    },
    {
      title: 'Category4',
      url: 'http://www.google.com'
    }
  ]

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        {/* <Button size="small">Subscribe</Button> */}
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <IconButton onClick={() => props.logout()}>Logout</IconButton>
        <IconButton>
          <Link href="/cart">
            <ShoppingCartIcon />
          </Link>
        </IconButton>
        <Button variant="outlined" size="small">
          Sign up
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {categories.map(category => (
          <Link
            color="inherit"
            noWrap
            key={category.title}
            variant="body2"
            href={`/${category.title}`}
            className={classes.toolbarLink}
          >
            {category.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  )
}

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(null, mapDispatch)(Header)

// Header.propTypes = {
//   sections: PropTypes.array,
//   title: PropTypes.string
// }
