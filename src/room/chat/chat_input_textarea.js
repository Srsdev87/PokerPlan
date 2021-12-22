import React, { useState } from 'react'
import '../room.scss'
import './style.scss'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'

const InputTextArea = (props) => {
  const [calls, setcalls] = useState([])
  let time = null

  const doubleEnterSubmit = (e) => {
    time = setTimeout(() => {
      setcalls([])
    }, 300)

    setcalls((calls) => [...calls, e])

    if (calls.length === 1 && e.target.value.trim() !== '') {
      clearTimeout(time)
      props.onSubmit(e)
    }
  }

  const replayMessage = () => {
    return (
      <div className="chat_replay_message_input">
        <p ref={props.replayRef}>{props.replayMessage?.message}</p>
      </div>
    )
  }

  return (
    <div className="message_input">
      <div className="input_textarea_container">
        {!!props.replayMessage?.message ? replayMessage() : null}

        <TextareaAutosize
          maxRows={6}
          className="chat_textarea"
          aria-label="Message"
          placeholder="Message"
          value={props.data}
          onChange={props.onMessageUpdate}
          autoComplete="off"
          ref={props.textAreaRef}
          onKeyPress={(e) => {
            if (e.code === 'Enter') {
              doubleEnterSubmit(e)
            }
          }}
        />
      </div>
      <IconButton size="small" onClick={props.onSubmit}>
        <SendIcon />
      </IconButton>
    </div>
  )
}

export default InputTextArea
