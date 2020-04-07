import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SettingsIcon from '@material-ui/icons/Settings';
const RoomName = ({onNameSubmit}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            <SettingsIcon style={{height: '20px', width: '20px'}}/>
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <b>Room name setting</b>
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                Change the room name
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="roomNameInput"
                label="Room name"
                fullWidth
            />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onNameSubmit} color="primary">
                    Change
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}

export default RoomName;