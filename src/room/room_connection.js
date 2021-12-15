import React, { useEffect, useState } from 'react'
import { useContext } from '../context/room_connection_context'
import useAuth from '../router/auth'
import './room.scss'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const RoomConnection = (props) => {
  const { startConnection } = useContext()
  const [isGroupUpdated, setGroupUpdate] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isGroupUpdated && isNewRoomConnection()) {
      props.onGroupConnectionIdUpdate(window.location.pathname.substring(1))
      setGroupUpdate(true)
    }
  }, [isGroupUpdated, props, props.group])

  const onButtonClick = () => {
    startConnection().then((_) => {
      login()
      navigate('/room')
    })
  }

  const isNewRoomConnection = () => {
    const pathname = window.location.pathname.substring(1)
    const isNewRoomMate = pathname !== '/' && pathname.length === 22

    return isNewRoomMate
  }

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <Card variant="outlined" className="card_outer_border">
      <CardContent>
        <TextField
          className="textfield"
          id="standard-basic"
          label="Player"
          variant="standard"
          value={capitalize(props.player)}
          autoComplete="off"
          onChange={props.onPlayerUpdate}
        />

        {!isNewRoomConnection() ? (
          <TextField
            className="textfield"
            id="standard-basic"
            label="Group"
            variant="standard"
            value={capitalize(props.group)}
            autoComplete="off"
            onChange={props.onGroupUpdate}
          />
        ) : null}

        <CardActions className="spacer center">
          <Button size="small" onClick={onButtonClick} value="connect">
            Connect
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default RoomConnection
