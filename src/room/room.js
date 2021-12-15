import React, { useState, useEffect } from 'react'
import './room.scss'
import { useContext } from '../context/room_connection_context'
import RoomChatWindow from './chat/room_chat_window'
import Header from '../header/header'

const Room = (props) => {
  const { playerdata, chat } = useContext()
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

  return (
    <div className="room_container_main">
      <Header
        player={userStoredData?.player || playerdata.player}
        group={userStoredData?.group || playerdata.group}
      />
      <div className="room_body_container">
        <div className="chat_main_container">
          <RoomChatWindow chat={chat} />
        </div>
        <div className="playground_container">playground</div>
        <div className="votes_history">votes history</div>
      </div>
    </div>
  )
}

export default Room
