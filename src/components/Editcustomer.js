import React, {useState} from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import Customers from './Customers';
import { InputRounded } from '@mui/icons-material';

export default function EditCustomer({params, updateCustomer}) {

    const [open, setOpen] = React.useState(false);
    const [customers, setCustomers] = useState({
        firstname: '',
        lastname: '',
       streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const handleClickOpen = () => {
        setCustomers({
            firstname: params.data.firstname,
            lastname: params.data.lastname,
            streetaddress: params.data.streetaddress,
            postcode: params.data.postcode,
            city: params.data.city,
            email: params.data.email,
            phone: params.data.phone
        })
        console.log(params);
      setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
      };
  
      const handleSave = () => {
          updateCustomer(customers, params.value);
          setOpen(false);
      }
  
      const inputChanged = (event) => {

        setCustomers({...customers, [event.target.name] : event.target.value});
        
        }
         return (
        <div>
        <IconButton variant="outlined" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>

        
        <Dialog open={open} onClose={handleClose}>
        
            <DialogTitle>
                Edit Customer
                </DialogTitle>
        
        <DialogContent>
        
            <TextField
                margin='dense'
                name='firstname'
                value={customers.firstname}
                onChange={inputChanged}
                label='First name'
                fullWidth
                variant='standard'
            />
        
            <TextField
                margin='dense'
                name='lastname'
                value={customers.lastname}
                onChange={inputChanged}
                label='Last name'
                fullWidth
                variant='standard'
            />
        
            <TextField
                margin='dense'
                name='streetaddress'
                value={customers.streetaddress}
                onChange={inputChanged}
                label='Street Address'
                fullWidth
                variant='standard'
            />
        
            <TextField
                margin='dense'
                name='postcode'
                value={customers.postcode}
                onChange={inputChanged}
                label='Postcode'
                fullWidth
                variant='standard'
            />
        
            <TextField
                margin='dense'
                name='city'
                value={customers.city}
                onChange={inputChanged}
                label='City'
                fullWidth
                variant='standard'
            />
        
            <TextField
                margin='dense'
                name='email'
                value={customers.email}
                onChange={inputChanged}
                label='E-mail'
                fullWidth
                variant='standard'
            />
        
            <TextField
                margin='dense'
                name='phone'
                value={customers.phone}
                onChange={inputChanged}
                label='Phone'
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
         )
        }
    
