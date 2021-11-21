import React from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

const ButtonCustom = ({ component: Component, ...props }) => {
  return props.type === 'icon' ? (
    <IconButton {...props} onClick={props.action} color="primary" aria-label="add to shopping cart">
      {Component}
    </IconButton>
  ) : (
    <Button {...props} onClick={props.action}>{props.content}</Button>
  )
}

export default ButtonCustom
