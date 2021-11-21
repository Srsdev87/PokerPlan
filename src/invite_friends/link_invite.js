import React, { useEffect, useState } from 'react'
import './style.scss'
import TextField from '@mui/material/TextField'
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone'
import ButtonCustom from '../shared/button'
import { useContext } from '../context/room_connection_context'

const LinkInvite = ({ component: Component, ...props }) => {
  const { roomId } = useContext()
  const [inviteLink, getInviteLink] = useState('')

  const inputProps = {
    value: inviteLink,
  }

  useEffect(() => {
    getInviteLink(
      `${window.location.origin}/${
        window.localStorage.getItem('roomId') || roomId
      }`,
    )
  }, [roomId])

  const copyInviteLink = () => {
    return navigator.clipboard.writeText(inviteLink)
  }

  return (
    <div className="invite_container">
      <TextField
        className="textfield"
        id="outlined-read-only-input"
        label="Invite"
        inputProps={inputProps}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
      />
      <ButtonCustom
        action={copyInviteLink}
        type="icon"
        content="click"
        component={<ContentCopyTwoToneIcon />}
      ></ButtonCustom>
    </div>
  )
}

export default LinkInvite
