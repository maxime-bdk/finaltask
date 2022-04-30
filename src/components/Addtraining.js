import React, {useState, useEffect} from 'react';

import Button from '@mui/material/Button';
import  TextField  from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions  from '@mui/material/DialogActions';
import  DialogContent  from '@mui/material/DialogContent';
import DialogTitle  from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


export default function AddTraining({link, saveTraining}) {

    const [open, setOpen] = React.useState(false);

    const [addtraining, setAddtraining] = useState({
        date: '',
        duration: '',
        activity: '',
        firstname: '',
        lastname: '',
        customer: link,
    });

    const handleClickOpen = () => {
    
      setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
      };

    const handleSave = () => {
        saveTraining(addtraining);
        setAddtraining ({
            date: '',
            duration: '',
            activity: '',
            firstname: '',
            lastname: '',
            customer: link,     
    
        });
        setOpen(false);
        
    }

    const inputChanged = (event) => {

        setAddtraining({...addtraining, [event.target.name] : event.target.value});
        
        }

return (
    <div>
 <IconButton variant="outlined" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
        
        <DialogTitle>
            Add Training
            </DialogTitle>
    
    <DialogContent>

            <LocalizationProvider dateAdapter={AdapterDateFns}>

                    <DateTimePicker

                renderInput={(props) => <TextField {...props} />}
                label="Select date"
                value={addtraining.date}
                onChange={(newValue) => {
                    setAddtraining({...addtraining, date:newValue});
                }}
          
                    />
            </LocalizationProvider>
            
        
            <TextField
                margin='dense'
                name='duration'
                value={addtraining.duration}
                onChange={inputChanged}
                label='Duration'
                fullWidth
                variant='standard'
            />
        
            <TextField
                margin='dense'
                name='activity'
                value={addtraining.activity}
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