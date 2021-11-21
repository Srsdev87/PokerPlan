import React, { useState, useRef, useEffect } from 'react'
import { HubConnectionBuilder } from '@microsoft/signalr'
import config from '../assets/config_reader'

const RoomConnectionContext = React.createContext()

function ConnectionProvider(props) {
  const { children } = props
  const [playerdata, setUserData] = useState({})
  const [connection, setConnection] = useState(null)
  const [chat, setChat] = useState([])
  const [roomId, setRoomId] = useState(null)
  const latestChat = useRef(null)

  latestChat.current = chat

  useEffect(() => {
    window.addEventListener('beforeunload', unload)
    return () => {
      window.removeEventListener('beforeunload', unload)
    }
  }, [])

  const unload = (e) => {
    setChat([])
  }

  function connect() {
    const connection = new HubConnectionBuilder()
      .withUrl(
        `${config.apiUrl}pokerhub?player=${playerdata.player}&group=${playerdata.group}&data=${playerdata.data}&groupConnectionId=${playerdata.groupConnectionId}`,
      )
      .withAutomaticReconnect()
      .build()

    return connection
  }

  function startConnection() {
    return new Promise((resolve, reject) => {
      const connection = connect()
      setConnection(connection)

      connection
        .start()
        .then((_) => {
          console.log('Connected!')

          connection.on('ReceiveMessage', (data) => {
            if (data?.isprivate) {
              window.localStorage.setItem('roomId', data.message)
              setRoomId(data.message)
            } else {
              const updatedChat = [...latestChat.current]
              updatedChat.push(data)
              setChat(updatedChat)
            }
          })

          connection.on('SendAsync', (data) => {
            const updatedChat = [...latestChat.current]
            updatedChat.push(data)
            setChat(updatedChat)
          })

          connection.onclose((e) => {
            debugger
          })
          resolve()
        })
        .catch((e) => {
          console.log('Connection failed: ', e)

          reject()
        })
    })
  }

  const sendGroupMessage = async () => {
    const isPlayerProvided = playerdata.player && playerdata.player !== ''
    const isMessageProvided = playerdata.data && playerdata.data !== ''
    if (isPlayerProvided && isMessageProvided) {
      await messageContext(
        playerdata.player,
        playerdata.group,
        playerdata.data,
        'SendGroupMessage',
      )
    } else {
      alert('Please insert an player and a message.')
    }
  }

  const publishNotificationMessage = async (player, group, data) => {
    await messageContext(player, group, data, 'PublishNotificationMessage')
  }

  async function messageContext(player, group, data, hubTargetFunction) {
    const chatMessage = {
      playerName: player,
      group: group,
      data: data,
    }

    if (connection.connectionStarted) {
      try {
        await connection.send(hubTargetFunction, chatMessage)
      } catch (e) {
        console.log(e)
      }
    } else {
      alert('No connection to server yet.')
    }
  }

  function updatePlayerData(player, group, data = '', groupConnectionId) {
    setUserData({ player, group, data , groupConnectionId})
  }

  const exports = {
    connection,
    chat,
    playerdata,
    roomId,
    sendGroupMessage,
    startConnection,
    updatePlayerData,
    publishNotificationMessage,
  }
  return (
    <RoomConnectionContext.Provider value={exports}>
      {children}
    </RoomConnectionContext.Provider>
  )
}

function useContext() {
  const context = React.useContext(RoomConnectionContext)

  if (context === undefined) {
    throw new Error('useContext must be used within a ConnectionProvider')
  }
  return context
}

export { useContext, ConnectionProvider }
