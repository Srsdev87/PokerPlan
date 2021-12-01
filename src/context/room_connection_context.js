import React, { useState, useRef, useEffect, useCallback } from 'react'
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

  const unload = useCallback((e) => {
    setChat([])
  }, [])

  const createConnectionUrl = (userData) => {
    const urlData =
      playerdata &&
      Object.keys(playerdata)?.length !== 0 &&
      Object.getPrototypeOf(playerdata) === Object.prototype
        ? { ...playerdata }
        : {
            player: userData?.playerName,
            group: userData?.group,
            data: userData?.data,
            groupConnectionId: userData?.groupConnectionId,
          }
    return `${config.apiUrl}pokerhub?player=${urlData.player}&group=${urlData.group}&data=${urlData.data}&groupConnectionId=${urlData.groupConnectionId}`
  }

  const connect = () => {
    const reconnectionData = JSON.parse(window.localStorage.getItem('userData'))
    let userData = {}
    if (
      reconnectionData &&
      Object.keys(reconnectionData)?.length !== 0 &&
      Object.getPrototypeOf(reconnectionData) === Object.prototype
    ) {
      reconnectionData.data = 'reconnected'
      userData = {
        ...reconnectionData,
      }
    }

    const connection = new HubConnectionBuilder()
      .withUrl(createConnectionUrl(userData))
      .withAutomaticReconnect()
      .build()
    return connection
  }

  const startConnection = () => {
    return new Promise((resolve, reject) => {
      const connection = connect()
      setConnection(connection)

      connection
        .start()
        .then((_) => {
          console.log('Connected!')

          connection.on('ReceiveMessage', (data) => {
            if (data?.isprivate) {
              const player = data.player
              window.localStorage.setItem(
                'roomId',
                JSON.stringify({
                  id: data.player?.groupConnectionId,
                  timestamp: new Date().toISOString(),
                }),
              )
              window.localStorage.setItem(
                'userData',
                JSON.stringify({
                  ...player,
                }),
              )
              setRoomId(data.message)
              updatePlayerData({
                player: player.playerName,
                group: player.group,
                data: player.data,
                groupConnectionId: player.groupConnectionId,
              })
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

  const reconnect = () => {
    startConnection()
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

  const updatePlayerData = async ({
    player,
    group,
    data = '',
    groupConnectionId,
  }) => {
    setUserData({ player, group, data, groupConnectionId })
  }

  useEffect(() => {
    window.addEventListener('beforeunload', unload)
    return () => {
      window.removeEventListener('beforeunload', unload)
    }
  }, [unload])

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem('roomId'))
    if (userData) {
      reconnect(userData.id)
    }
  }, [])

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
