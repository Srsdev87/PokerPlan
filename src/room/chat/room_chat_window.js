import React, { useState, useEffect } from 'react'
import '../room.scss'
import RoomChatMessage from './room_chat_message'
import { useContext } from '../../context/room_connection_context'
import Badge from '@mui/material/Badge'
import InputTextArea from './chat_input_textarea'

const RoomChatWindow = (props) => {
  const { updatePlayerData, sendGroupMessage, playerdata, chat } = useContext()
  const [data, setMessage] = useState('')
  const [isExpanded, setChatPosition] = useState(true)
  const [currentChatMessageCount, setCurrentChatMessageCount] = useState(0)
  const [linebreaksCounter, setLinebreakCount] = useState([])
  const [replayMessage, setReplayMessage] = useState('')
  const textAreaRef = React.createRef()

  const ch = props.chat.map((m, i, row) =>
    m.data && m.playerName ? (
      <RoomChatMessage
        key={Date.now() * Math.random()}
        player={m.playerName}
        data={m.data}
        setMessage={setMessage}
        setReplayMessage={setReplayMessage}
        replayMessage={i + 1 === row.length ? replayMessage : null}
      />
    ) : (
      <RoomChatMessage
        key={Date.now() * Math.random()}
        data={m}
        setMessage={setMessage}
        setReplayMessage={setReplayMessage}
        replayMessage={replayMessage}
      />
    ),
  )

  useEffect(() => {
    if (isExpanded) {
      setCurrentChatMessageCount(chat.length)
    }
  }, [chat.length, isExpanded])

  const onMessageUpdate = (e) => {
    setMessage(e.target.value)
    calculateLinebreaks()
    updatePlayerData({
      player: playerdata.player,
      group: playerdata.group,
      data: e.target.value,
    })
  }

  const calculateLinebreaks = () => {
    const currentLineHeight = parseInt(textAreaRef.current.style.height, 10)
    if (!linebreaksCounter.includes(currentLineHeight)) {
      setLinebreakCount((lines) => [...lines, currentLineHeight])
      console.log('line breaks', linebreaksCounter.length)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (data) {
      sendGroupMessage()
    }
    setMessage('')
  }

  const toggleChat = () => {
    setChatPosition(!isExpanded)
    if (!isExpanded) {
      setCurrentChatMessageCount(chat.length)
    }
  }

  const showBadge = () => {
    return chat.length > currentChatMessageCount && !isExpanded
  }

  return (
    <div className="chat_wrapper">
      <div
        className="message_container"
        style={
          isExpanded
            ? { marginLeft: '10px', opacity: '1' }
            : { marginLeft: '-54vh', opacity: '0' }
        }
      >
        <InputTextArea
          onSubmit={onSubmit}
          setMessage={setMessage}
          data={data}
          onMessageUpdate={onMessageUpdate}
          textAreaRef={textAreaRef}
          replayMessage={replayMessage}
        />
        <div className="chat_container">{Array.from(ch).reverse()}</div>
      </div>
      <div className="chat_room_button" onClick={toggleChat}>
        {showBadge() ? (
          <Badge
            className="badge_messages"
            color="secondary"
            badgeContent={chat.length - currentChatMessageCount}
          ></Badge>
        ) : null}
      </div>
    </div>
  )
}

export default RoomChatWindow
