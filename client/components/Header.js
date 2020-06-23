import React from 'react'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import Badge from '@material-ui/core/Badge'
import {Menu} from './index'
import {connect} from 'react-redux'

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0
  },
  icons: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
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

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px'
  }
}))(Badge)

export function Header(props) {
  const classes = useStyles()

  const title = 'Website Title'
  const categories = [
    {
      title: 'Loneliness',
      url: '/category/loneliness'
    },
    {
      title: 'Hunger',
      url: '/category/hunger'
    },
    {
      title: 'Staying Safe',
      url: '/category/staysafe'
    },
    {
      title: 'Learning',
      url: '/category/learning'
    },
    {
      title: 'Entertainment',
      url: '/category/entertainment'
    },
    {
      title: 'Self Care',
      url: '/category/selfcare'
    },
    {
      title: 'Essentials',
      url: '/category/essentials'
    }
  ]

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
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
        <div className={classes.icons}>
          <Menu />
          <IconButton>
            <Link href="/wishlist">
              <FavoriteBorderIcon />
            </Link>
          </IconButton>
          <IconButton aria-label="cart">
            <StyledBadge color="secondary" badgeContent={props.cart.length}>
              <Link href="/cart">
                <ShoppingCartIcon />
              </Link>
            </StyledBadge>
          </IconButton>
        </div>
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
            href={category.url}
            className={classes.toolbarLink}
          >
            {category.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  )
}

const mapState = state => ({
  cart: state.cart
})

export default connect(mapState)(Header)
