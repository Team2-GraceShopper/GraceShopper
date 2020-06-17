import React from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone'
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp'

export default class ToggleHeart extends React.Component {
  constructor() {
    super()
    this.state = {
      hovered: false,
      clicked: false,
      cursor: ''
    }
    this.handleHover = this.handleHover.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleHover() {
    this.setState(prevState => ({
      hovered: !prevState.hovered,
      cursor: prevState.cursor === '' ? 'pointer' : ''
    }))
  }

  handleClick() {
    // add "add to wishlist" functionality

    this.setState(prevState => ({clicked: !prevState.clicked}))
  }

  render() {
    return (
      <div
        className={this.state.cursor}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
        onMouseDown={this.handleClick}
      >
        {this.state.clicked ? (
          <FavoriteSharpIcon />
        ) : this.state.hovered ? (
          <FavoriteTwoToneIcon />
        ) : (
          <FavoriteBorderIcon />
        )}
      </div>
    )
  }
}
