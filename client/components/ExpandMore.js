import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

export default function ExpandMore(props) {
  return (
    <ExpandMoreIcon
      className={props.className}
      height={props.height}
      width={props.width}
    />
  )
}
