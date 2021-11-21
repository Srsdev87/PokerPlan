import React from 'react'

import RoomMessage from './room_message'

const RoomWindow = (props) => {
  const chat = props.chat.map((m) =>
  m.data && m.playerName ? (
      <RoomMessage
        key={Date.now() * Math.random()}
        player={m.playerName}
        data={m.data}
      />
    ) : (
      <RoomMessage key={Date.now() * Math.random()} data={m} />
    ),
  )
  return <div>{chat}</div>
}

export default RoomWindow
