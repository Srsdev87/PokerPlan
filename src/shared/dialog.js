import * as React from 'react'
import './style.scss'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import Disconnect from '../logout/logout'

const SettingsDialog = (props) => {
  const { onClose, selectedValue, open } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{props.title}</DialogTitle>
      {props.actions[0]?.act === 'logout' ? (
        <Disconnect onClose={onClose} />
      ) : (
        <List sx={{ pt: 0 }}>
          {props.actions.map((action) => (
            <ListItem
              button
              onClick={() => handleListItemClick(action.act)}
              key={action.act}
            >
              {action.title}
              <ListItemText primary={action.act} />
            </ListItem>
          ))}
        </List>
      )}
    </Dialog>
  )
}

export default SettingsDialog
