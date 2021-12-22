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
  const [replayMessage, setReplayMessage] = useState({})
  const [containersReplayIds, setContainersReplayIds] = useState([])

  const textAreaRef = React.createRef()
  const chatContainerRef = React.createRef()

  const ch = props.chat.map((m, i, row) =>
    m.data && m.playerName ? (
      <RoomChatMessage
        key={Date.now() * Math.random()}
        player={m.playerName}
        data={m.data}
        setMessage={setMessage}
        setReplayMessage={setReplayMessage}
        chatContainerRef={chatContainerRef}
        msgId={i}
        setContainersReplayIds={setContainersReplayIds}
        containersReplayIds={containersReplayIds}
        id={
          containersReplayIds
            .sort((a, b) => a - b)
            .find((repid) => repid.id === i)?.uuid
        }
        replayMessage={replayMessage}
      />
    ) : (
      <RoomChatMessage
        key={Date.now() * Math.random()}
        data={m}
        setMessage={setMessage}
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
    updatePlayerData({
      player: playerdata.player,
      group: playerdata.group,
      data: JSON.stringify({
        message: e.target.value,
        replayMsg: replayMessage.message,
        uuid: replayMessage.id,
      }),
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (data) {
      sendGroupMessage()
    }
    setMessage('')
    setReplayMessage({})
    scrollDownChatOnSubmit()
  }

  const scrollDownChatOnSubmit = () => {
    const container = chatContainerRef.current
    container.scrollTop = 0
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

  const test = () => {
    const height = document.getElementById('message_container_id').clientWidth;

    return `-${height}px`
  }

  return (
    <div className="chat_wrapper">
      <div
        className="message_container"
        id="message_container_id"
        style={
          isExpanded
            ? { marginLeft: '10px', opacity: '1' }
            : { marginLeft: `${test()}`, opacity: '0' }
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
        <div className="chat_container" ref={chatContainerRef}>
          {Array.from(ch).reverse()}
        </div>
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
