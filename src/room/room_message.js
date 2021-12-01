import React from 'react'

import './room.scss'
import { useContext } from '../context/room_connection_context'

const RoomMessage = (props) => {
  const { playerdata } = useContext()
  let chatIdentity = 'default'
  let nameFloat = ''
  if (props.player) {
    if (playerdata.player === props.player) {
      chatIdentity = 'self'
      nameFloat = ''
    } else {
      chatIdentity = 'team'
      nameFloat = 'chat_name_float'
    }
  }

  return (
    <div className={`chat_message_container_${chatIdentity}`}>
      {props.player ? (
        <div className={`chat_pin chat_pin_colors_${chatIdentity}`}></div>
      ) : null}
      <div className={`chat_message_${chatIdentity} chat_message_colors_${chatIdentity}`}>
        {props.player ? (
          <p className={`chat_player_name ${nameFloat}`}>{props.player}</p>
        ) : null}
        <p className="chat_message_text">{props.data}</p>
      </div>
    </div>
  )
}

export default RoomMessage
