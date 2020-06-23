import React from 'react'
import {connect} from 'react-redux'
import {me, logout} from '../store/user'
import MenuRender from './MenuRender'
import Button from '@material-ui/core/Button'

export class Menu extends React.Component {
  componentDidMount() {
    this.props.getUser()
  }

  render() {
    return this.props.user.id ? (
      <MenuRender user={this.props.user} logout={this.props.logout} />
    ) : (
      <Button variant="outlined" size="small" href="/login">
        Sign In
      </Button>
    )
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  getUser: () => dispatch(me()),
  logout: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(Menu)
