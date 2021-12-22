import React, { useState, useEffect } from 'react'
import '../room.scss'
import { v4 as uuidv4 } from 'uuid'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Tooltip from '@mui/material/Tooltip'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone'
import ReplyIcon from '@mui/icons-material/Reply'
import { useContext } from '../../context/room_connection_context'

const RoomChatMessage = (props) => {
  const [open, setOpen] = React.useState(false)
  const [currentMessage, setCurrentMessage] = useState('')
  const [replayMessage, setReplayMessage] = useState({})
  const { playerdata } = useContext()
  const chatSettingsRef = React.createRef()
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

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = () => {
    setOpen(true)
  }

  const showChatSettings = () => {
    chatSettingsRef?.current?.classList.remove('chat_options_icon')
  }

  const hideChatSettings = () => {
    chatSettingsRef?.current?.classList.add('chat_options_icon')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentMessage)
  }

  const getLocalTime = () => {
    const currentTime = new Date().toLocaleTimeString()
    const currentFormatedTime = currentTime.split(':')
    return `${currentFormatedTime[0]}:${currentFormatedTime[1]}`
  }

  const replayAdd = () => {
    const uuid = uuidv4()
    setReplayOriginalMessageConnection(uuid)
    props.setReplayMessage({ message: currentMessage, id: uuid })
  }

  const setReplayOriginalMessageConnection = (uuid) => {
    props.setContainersReplayIds((ids) => [...ids, { id: props.msgId, uuid }])
  }

  const messageParser = (data) => {
    try {
      return JSON.parse(data)
    } catch (err) {
      return data
    }
  }

  const selectReplayedMessage = (evt) => {
    const refContainer = props.chatContainerRef
    const foundReplayMessage = Array.from(refContainer.current.children).find(
      (child) => child.id === evt.currentTarget.getAttribute('uuid'),
    )

    if (foundReplayMessage) {
      foundReplayMessage.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      })
      foundReplayMessage.classList.add('replay_blink')
      setTimeout(() => {
        foundReplayMessage.classList.remove('replay_blink')
      }, 2100)
    }
  }

  const generateReplayMessage = () => {
    if (!replayMessage.uuid) return null

    const replayElement = (
      <div
        className={`chat_replay_message_output_${chatIdentity}`}
        onClick={selectReplayedMessage}
        uuid={replayMessage?.uuid}
      >
        <p ref={props.replayRef}>{replayMessage.replayMsg}</p>
      </div>
    )

    return replayElement
  }

  useEffect(() => {
    const data = messageParser(props.data)
    if (typeof data === 'object') setReplayMessage(data)
    setCurrentMessage(data.message || data)
  }, [props.data])

  return (
    <div className={`chat_message_container_${chatIdentity}`} id={props.id}>
      {props.player ? (
        <div className={`chat_pin chat_pin_colors_${chatIdentity}`}></div>
      ) : null}
      <div
        className={`chat_message_${chatIdentity} chat_message_colors_${chatIdentity}`}
      >
        {props.player && props.player !== playerdata.player ? (
          <p className={`chat_player_name ${nameFloat}`}>{props.player}</p>
        ) : null}

        {!!replayMessage.replayMsg ? generateReplayMessage() : null}

        <div
          className="chat_inner_text"
          onMouseOver={showChatSettings}
          onMouseOut={hideChatSettings}
        >
          <p
            className={`chat_message_text chat_message_text_color_${chatIdentity}`}
          >
            {currentMessage}
          </p>
          {chatIdentity !== 'default' ? (
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={
                  <div>
                    <div
                      className="chat_popup_option"
                      onClick={copyToClipboard}
                    >
                      <ContentCopyTwoToneIcon /> Copy text
                    </div>
                    <div className="chat_popup_option" onClick={replayAdd}>
                      <ReplyIcon /> Reply
                    </div>
                  </div>
                }
              >
                <MoreVertIcon
                  ref={chatSettingsRef}
                  onMouseEnter={showChatSettings}
                  onClick={handleTooltipOpen}
                  className="icon_style chat_options_icon"
                />
              </Tooltip>
            </ClickAwayListener>
          ) : null}
        </div>
        <div className="chat_message_time">{getLocalTime()}</div>
      </div>
    </div>
  )
}

export default RoomChatMessage
