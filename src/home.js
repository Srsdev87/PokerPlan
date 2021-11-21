import React, { useState } from 'react'
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
    updatePlayerData(e.target.value, group, data, groupConnectionId)
  }

  const onGroupUpdate = (e) => {
    setGroup(e.target.value)
    updatePlayerData(player, e.target.value, data, groupConnectionId)
  }

  const onDataUpdate = (eData) => {
    setData(eData)
    updatePlayerData(player, group, eData, groupConnectionId)
  }

  const onGroupConnectionIdUpdate = (groupConnectionId) => {
    setGroupConnectionId(groupConnectionId)
    updatePlayerData(player, group, data, groupConnectionId)
  }

  return (
    <div>
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

      <IconCards style={{ width: '100px', height: '150px' }} />

      <IconsRandomApear />
    </div>
  )
}

export default Home
