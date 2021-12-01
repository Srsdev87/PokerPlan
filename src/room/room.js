import React, { useState, useEffect } from 'react'
import './room.scss'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { useContext } from '../context/room_connection_context'
import RoomWindow from '../room/room_window'
import SendIcon from '@mui/icons-material/Send'
import Header from '../header/header'

const Room = (props) => {
  const { updatePlayerData, sendGroupMessage, playerdata, chat } = useContext()
  const [data, setMessage] = useState('')
  const [userStoredData, setUserStoredData] = useState({})

  useEffect(() => {
    if (
      userStoredData &&
      Object.keys(userStoredData)?.length === 0 &&
      userStoredData.constructor === Object
    ) {
      setUserStoredData(JSON.parse(window.localStorage.getItem('userData')))
    }
  }, [userStoredData])

  const onMessageUpdate = (e) => {
    setMessage(e.target.value)
    updatePlayerData({
      player: playerdata.player,
      group: playerdata.group,
      data: e.target.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    sendGroupMessage()
    setMessage('')
  }

  return (
    <div className="room_container_main">
      <Header
        player={userStoredData?.player || playerdata.player}
        group={userStoredData?.group || playerdata.group}
      />

      <div className="message_container">
        <div className="message_input">
          <TextField
            className="textfield"
            id="standard-basic"
            label="Message"
            variant="standard"
            value={data}
            onChange={onMessageUpdate}
            onKeyPress={(e) => {
              if (e.code === 'Enter') {
                onSubmit(e)
              }
            }}
          />

          <IconButton size="small" onClick={onSubmit}>
            <SendIcon />
          </IconButton>
        </div>

        <RoomWindow chat={chat} />
      </div>
    </div>
  )
}

export default Room
