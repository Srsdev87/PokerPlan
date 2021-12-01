import React from 'react'
import { AuthProvider } from './router/auth'
import { ConnectionProvider } from './context/room_connection_context'
import Home from './home'
import Room from './room/room'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import RoomGuard from './router/guard'

function App() {
  return (
    <div>
      <AuthProvider>
        <ConnectionProvider>
          <Router>
            <Routes>
              <Route exact path="/*" element={<Home />} />
              <Route
                path="/room"
                element={
                  <RoomGuard>
                    <Room />
                  </RoomGuard>
                }
              />
            </Routes>
          </Router>
        </ConnectionProvider>
      </AuthProvider>
    </div>
  )
}

export default App
