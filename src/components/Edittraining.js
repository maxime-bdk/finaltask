import React, {useState} from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function EditTraining({params, updateTraining}) {

    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: ''

    });

    const handleClickOpen = () => {
        setTraining({
            date: params.data.date,
            duration: params.data.duration,
            activity: params.data.activity,
            
        })
        console.log(params);
      setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
      };
  
      const handleSave = () => {
            updateTraining(training, params.value);
          setOpen(false);
      }
  
      const inputChanged = (event) => {

        setTraining({...training, [event.target.name] : event.target.value});
      }


      return (
        <div>
        <IconButton variant="outlined" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
        
        <DialogTitle>
            Edit Training
            </DialogTitle>
    
    <DialogContent>

            <LocalizationProvider dateAdapter={AdapterDateFns}>

                    <DateTimePicker

                renderInput={(props) => <TextField {...props} />}
                label="Select date"
                value={training.date}
                onChange={(newValue) => {
                    setTraining({...training, date:newValue});
                }}
          
                    />
            </LocalizationProvider>
        
            <TextField
                margin='dense'
                name='duration'
                value={training.duration}
                onChange={inputChanged}
                label='Duration'
                fullWidth
                variant='standard'
            />
        
            <TextField
                margin='dense'
                name='activity'
                value={training.activity}
                onChange={inputChanged}
                label='Activity'
                fullWidth
                variant='standard'
            />
        
           
    </DialogContent>
    
    <DialogActions>
        
        <Button onClick={handleClose} >Close</Button>
        <Button onClick={handleSave}>Save</Button>
        
    </DialogActions>

    </Dialog>

        </div>
      );
}