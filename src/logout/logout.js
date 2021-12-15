import * as React from 'react'
import './style.scss'
import Button from '@mui/material/Button'

const Disconnect = (props) => {
  const handleYesClick = () => {
    window.localStorage.clear()
    window.location.replace(window.location.origin)
  }

  const handleNoClick = () => {
    props.onClose()
  }

  return (
    <div className="logout_container">
      <div> Are you sure?</div>
      <div className="actions-control">
        <Button variant="outlined" onClick={handleYesClick} data={'settings'}>
          Yes
        </Button>
        <Button variant="outlined" onClick={handleNoClick} data={'settings'}>
          No
        </Button>
      </div>
    </div>
  )
}

export default Disconnect
