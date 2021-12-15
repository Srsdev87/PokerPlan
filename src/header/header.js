import React, { useState } from 'react'
import './style.scss'

import LinkInvite from '../invite_friends/link_invite'
import Button from '@mui/material/Button'
import SettingsDialog from '../shared/dialog'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'

const Header = (props) => {
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(null)
  const [title, setTitle] = useState('')
  const [actions, setActions] = useState([])

  const handleClickOpen = (e) => {
    setTitle(e.target.innerText)
    setActions(
      e.target.innerText === 'LOG OUT'
        ? [{ title: 'LOG OUT', act: 'logout' }]
        : [],
    )
    setOpen(true)
  }

  const handleClose = (value) => {
    setOpen(false)
    setSelectedValue(value)
  }

  return (
    <div className="header_container">
      <div className="player_container">
        <div className="player_icon"></div>
        {props.player}
      </div>
      <div className="player_container">
        <div className="group_icon"></div>
        {props.group}
      </div>
      <LinkInvite />
      <div className="buttons_container">
        <div>
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            data={'settings'}
          >
            <SettingsIcon className="icon_margin" /> Settings
          </Button>
        </div>
        <div>
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            data={'disconnect'}
          >
            <LogoutIcon className="icon_margin" /> Log out
          </Button>
        </div>

        <SettingsDialog
          title={title}
          actions={actions}
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      </div>
    </div>
  )
}

export default Header
