import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useContext } from '../context/room_connection_context'
import RoomWindow from '../room/room_window'

import LinkInvite from '../invite_friends/link_invite'

const Room = (props) => {
  const { updatePlayerData, sendGroupMessage, playerdata, chat } = useContext()
  const [data, setMessage] = useState('')

  const onMessageUpdate = (e) => {
    setMessage(e.target.value)
    updatePlayerData(playerdata.player, playerdata.group, e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    sendGroupMessage()
  }

  return (
    <div>
      <TextField
        className="textfield"
        id="standard-basic"
        label="Message"
        variant="standard"
        value={data}
        onChange={onMessageUpdate}
      />

      <Button size="small" onClick={onSubmit}>
        Submit
      </Button>

      <RoomWindow chat={chat} />

      <LinkInvite />
    </div>
  )
}

export default Room
