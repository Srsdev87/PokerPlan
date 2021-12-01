import React, { useState } from 'react'
import './App.css'
import { useEffect } from 'react/cjs/react.development'
import { useContext } from './context/room_connection_context'
import RoomInput from './room/room_input'

import { IconCards, IconsRandomApear } from './shared/icons'

const Home = (props) => {
  const { sendGroupMessage, updatePlayerData } = useContext()
  const [player, setPlayer] = useState('')
  const [group, setGroup] = useState('')
  const [data, setData] = useState('')
  const [groupConnectionId, setGroupConnectionId] = useState('')

  useEffect(() => {
    if (window.location.search !== '')
      setGroup(window.location.search.replace('?', ''))
  }, [group])

  const onPlayerUpdate = (e) => {
    setPlayer(e.target.value)
    updatePlayerData({ player: e.target.value, group, data, groupConnectionId })
  }

  const onGroupUpdate = (e) => {
    setGroup(e.target.value)
    updatePlayerData({ player, group: e.target.value, data, groupConnectionId })
  }

  const onDataUpdate = (eData) => {
    setData(eData)
    updatePlayerData({ player, group, data: eData, groupConnectionId })
  }

  const onGroupConnectionIdUpdate = (groupConnectionId) => {
    setGroupConnectionId(groupConnectionId)
    updatePlayerData({ player, group, data, groupConnectionId })
  }

  return (
    <div className="home_login_main_container">
      <div>
        <RoomInput
          sendGroupMessage={sendGroupMessage}
          onPlayerUpdate={onPlayerUpdate}
          onGroupUpdate={onGroupUpdate}
          onDataUpdate={onDataUpdate}
          onGroupConnectionIdUpdate={onGroupConnectionIdUpdate}
          player={player}
          group={group}
          data={data}
        />
      </div>

      <IconsRandomApear />

      <IconCards style={{ width: '100px', height: '150px' }} />
    </div>
  )
}

export default Home
