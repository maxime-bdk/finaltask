import React, {useState, useEffect, useRef, useCallback} from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';

import AddCustomer from './Addcustomer';
import EditCustomer from './Editcustomer';
import fetchTrainings from './Trainings';
import AddTraining from './Addtraining';

const linkStyle1 = {
    marginTop: 10,
    textDecoration: 'underline white',
    color: 'white'
  };

function CustomerList() {

    const gridRef = useRef();

    const [open, setOpen] = useState(false);

const fullName = (params) => {
    return params.data.firstname + ' ' + params.data.lastname;
}

const [customer, setCustomer] = useState([]);


    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => {setCustomer(data.content)})
        .catch(err => console.error(err))
        }
        
  
        
        useEffect(() => {
            fetchCustomers();
            }, []);
        
    const saveCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newCustomer)
        })

        .then(response => {
            if (response.ok) {
                fetchCustomers();
            }
            else {
                alert('Something went wrong');
            }
        })
        .catch(err => console.error(err))


    }

    const saveTraining = (newTraining) => {
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTraining)
        })

        .then(response => {
            if (response.ok) {
                fetchTrainings();
            }
            else {
                alert('Something went wrong');
            }
        })
        .catch(err => console.error(err))


    }


    const updateCustomer = (updatedCustomer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedCustomer)

        })
        .then(response => {
            if (response.ok) {
                fetchCustomers();
                }
                else {
                    alert('Something went wrong while editing customer info');
                }
            })
            .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('R u sure?')) {
         fetch(link, {method: 'DELETE'})
         .then(response => {
            if (!response.ok) {
            alert('Something went wrong in deletion');
         }
            else {
                setOpen(true);
            fetchCustomers();
         }
         })
         .catch(err => console.error(err))
         }
     }
 
     const onBtnExport = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
      }, []);

const [custcolumns, setCustcolumns] = useState([
{field: 'fullname', sortable: true, filter: true, width: 240, valueGetter: fullName },
{field: 'streetaddress', sortable: true, filter: true, width: 240},
{field: 'postcode', sortable: true, filter: true, width: 240},
{field: 'city', sortable: true, filter: true, width: 240},
{field: 'email', sortable: true, filter: true, width: 240},
{field: 'phone', sortable: true, filter: true, width: 240},
{field: 'firstame', sortable: true, filter: true, hide: true},
{field: 'lastname', sortable: true, filter: true, hide: true}, 
{
    headerName:'',
    width: 120,
    field: 'links.0.href',
    cellRenderer: params => <AddTraining link={params.value} saveTraining={saveTraining}/>
}, 

{
    headerName:'',
    width: 120,
    field: 'links.0.href',
    cellRenderer: params => <EditCustomer params={params} updateCustomer={updateCustomer}/>
},

{
    headerName:'',
    width: 120,
    field: 'links.0.href',
    cellRenderer: params =>
        <IconButton color='error' onClick={() => deleteCustomer(params.value)} >
            <DeleteIcon />
        </IconButton>
}

])

return(
<>
<Stack direction="row" spacing={2} sx={{ backgroundColor: "warning.main", borderRadius: 2 }}>

<AddCustomer saveCustomer={saveCustomer}/>
<Button variant='secondary' color="success" backgroundColor="warning.main" onClick={onBtnExport} style={linkStyle1}>
Export to CSV
</Button>

</Stack>
    <div className="ag-theme-material" style={{height: 600, width: '100%'}}>
    <AgGridReact
    ref={gridRef}
    rowData={customer}
    columnDefs={custcolumns}
    pagination={true}
    paginationPageSize={10}
    suppressCellFocus={true}>
    </AgGridReact>
    </div>
    <Snackbar 
       open={open}
       autoHideDuration={3000}
       onClose={() => setOpen(false)}
       message='Car was deleted successfully'
       />

</>
    );

}


export default CustomerList;