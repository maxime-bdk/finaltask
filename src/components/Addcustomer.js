import React, {useState, useEffect} from 'react';

import Button from '@mui/material/Button';
import  TextField  from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions  from '@mui/material/DialogActions';
import  DialogContent  from '@mui/material/DialogContent';
import DialogTitle  from '@mui/material/DialogTitle';

const linkStyle1 = {
    marginTop: 10,
    textDecoration: 'underline white',
    color: 'white'
  };

export default function AddCustomer({saveCustomer}) {

const [opencust, setOpencust] = React.useState(false);
const [customers, setCustomers] = useState({
    firstname: '',
    lastname: '',
   streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: '',
});

const handleClickOpenCust = () => {
    setOpencust(true);
}

const handleClickCloseCust = () => {
    setOpencust(false);
}

const handleSaveCust = () => {
    saveCustomer(customers);
    setCustomers ({
        firstname: '',
        lastname: '',
       streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''   

    });
    setOpencust(false);
    
}

const inputChangedCust = (event) => {

setCustomers({...customers, [event.target.name] : event.target.value});

}
 return (
<div>
<Button variant='secondary' color="success" backgroundColor="warning.main" onClick={handleClickOpenCust} style={linkStyle1}>
Add Customer
</Button>

<Dialog open={opencust} onClose={handleClickCloseCust}>

    <DialogTitle>
        New Customer
        </DialogTitle>

<DialogContent>

    <TextField
        margin='dense'
        name='firstname'
        value={customers.firstname}
        onChange={inputChangedCust}
        label='First name'
        fullWidth
        variant='standard'
    />

    <TextField
        margin='dense'
        name='lastname'
        value={customers.lastname}
        onChange={inputChangedCust}
        label='Last name'
        fullWidth
        variant='standard'
    />

    <TextField
        margin='dense'
        name='streetaddress'
        value={customers.streetaddress}
        onChange={inputChangedCust}
        label='Street Address'
        fullWidth
        variant='standard'
    />

    <TextField
        margin='dense'
        name='postcode'
        value={customers.postcode}
        onChange={inputChangedCust}
        label='Postcode'
        fullWidth
        variant='standard'
    />

    <TextField
        margin='dense'
        name='city'
        value={customers.city}
        onChange={inputChangedCust}
        label='City'
        fullWidth
        variant='standard'
    />

    <TextField
        margin='dense'
        name='email'
        value={customers.email}
        onChange={inputChangedCust}
        label='E-mail'
        fullWidth
        variant='standard'
    />

    <TextField
        margin='dense'
        name='phone'
        value={customers.phone}
        onChange={inputChangedCust}
        label='Phone'
        fullWidth
        variant='standard'
    />

</DialogContent>

    <DialogActions>

        <Button onClick={handleClickCloseCust} >Close</Button>
        <Button onClick={handleSaveCust}>Save</Button>
        
    </DialogActions>

</Dialog>
</div>
 )
}