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

  const title = 'Maison Q'
  const categories = [
    {
      id: 1,
      title: 'Loneliness',
      url: '/category/1'
    },
    {
      id: 2,
      title: 'Hunger',
      url: '/category/2'
    },
    {
      id: 3,
      title: 'Staying Safe',
      url: '/category/3'
    },
    {
      id: 4,
      title: 'Learning',
      url: '/category/4'
    },
    {
      id: 5,
      title: 'Entertainment',
      url: '/category/5'
    },
    {
      id: 6,
      title: 'Self-Care',
      url: '/category/6'
    },
    {
      id: 7,
      title: 'Essentials',
      url: '/category/7'
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
          <Link href="/" color="inherit" underline="none">
            {title}
          </Link>
        </Typography>
        <div className={classes.icons}>
          <Menu />
          <IconButton>
            <Link href="/wishlist">
              <FavoriteBorderIcon />
            </Link>
          </IconButton>
          <IconButton aria-label="cart">
            <Link href="/cart">
              <StyledBadge color="secondary" badgeContent={props.cart.length}>
                <ShoppingCartIcon />
              </StyledBadge>
            </Link>
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
            className={classes.toolbarLink}
            href={category.url}
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
