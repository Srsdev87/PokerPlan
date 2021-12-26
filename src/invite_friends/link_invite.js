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
        JSON.parse(window.localStorage.getItem('roomId'))?.id || roomId
      }`,
    )
  }, [roomId])

  const copyInviteLink = async () => {
    try {
      const queryOpts = { name: 'clipboard-read', allowWithoutGesture: false };
       await navigator.permissions.query(queryOpts);
      return navigator.clipboard.writeText(inviteLink)
    } catch (err) {
      return ''
    }
  }

  return (
    <div className="invite_container">
      <TextField
        className="invite_link"
        id="outlined-read-only-input"
        label="Invite Players"
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
