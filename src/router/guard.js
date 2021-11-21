import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from './auth'

const getCurrentLocation = () => {
  return window.location.pathname
}

const RoomGuard = (props) => {
  const { authed } = useAuth()
  const currentPath = getCurrentLocation()
  return authed || currentPath !== '/' ? (
    props.children
  ) : (
    <Navigate to="/" exact />
  )
}
export default RoomGuard
