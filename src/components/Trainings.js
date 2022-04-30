import React, {useState, useEffect, useCallback, useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';



import moment from 'moment';
import { format} from 'date-fns';
import { LinkSharp } from '@mui/icons-material';

import EditTraining from './Edittraining';
import AddTraining from './Addtraining';

const linkStyle1 = {
    marginTop: 10,
    textDecoration: 'underline white',
    color: 'white'
  };

function TrainingList() {

    const gridRef = useRef();

    const [open, setOpen] = useState(false);

   

    const fullNameTr = (params) => {
        return params.data.customer.firstname + ' ' + params.data.customer.lastname;
    }

    const dateFormatter = (params) => {
        
       return moment(params.value).format('MMMM Do YYYY, h:mm:ss a');

      };
      

    const [training, setTraining] = useState([]);
    
    
        const fetchTrainings = () => {
            fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => {setTraining(data)})
            .catch(err => console.error(err))
            }
    
        useEffect(() => {
            fetchTrainings();
            }, []);

        const deleteTraining = (id) => {
            if (window.confirm('Are you sure?')) {
                fetch('https://customerrest.herokuapp.com/api/trainings/'  + id, {method: 'DELETE'})
                .then(response => {
            if (!response.ok) {
                alert('Something went wrong in deletion');
         }
            else {
                setOpen(true);
                fetchTrainings();
         }
         })
         .catch(err => console.error(err))
         }
     }


     const updateTraining = (updatedTraining, id) => {
        fetch('https://customerrest.herokuapp.com/api/trainings/' + id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedTraining)

        })
        .then(response => {
            if (response.ok) {
                fetchTrainings();
                }
                else {
                    alert('Something went wrong while editing training info');
                }
            })
            .catch(err => console.error(err))
    }
    const onBtnExport = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
      }, []);
    
    const [traincolumns, setTraincolumns] = useState([
    {field: 'firstname', sortable: true, filter: true, width: '300%', 
    valueFormatter: fullNameTr}, 
    {field: 'date', sortable: true, filter: true, width: '300%', 
    valueFormatter: dateFormatter },
    {field: 'duration', sortable: true, filter: true, width: '300%'},
    {field: 'activity', sortable: true, filter: true, width: '300%'},
    {field: 'customer.firstname', width: '300%', hide: true},
    {field: 'customer.lastname', width: '300%', hide: true},  
    {
        headerName:'',
        width: 120,
        field: 'id',
        cellRenderer: params => <EditTraining params={params} updateTraining={updateTraining}/>
    },

    {
        headerName:'',
        width: 120,
        field: 'id',
        cellRenderer: params =>
            <IconButton color='error' onClick={() => deleteTraining(params.value)} >
                <DeleteIcon />
            </IconButton>
    }      
    ])
    
                    
        return(

        <>
        <Stack sx={{ backgroundColor: "warning.main", borderRadius: 2 }}>
        <Button variant='secondary' color="success" backgroundColor="warning.main" onClick={onBtnExport} style={linkStyle1}>
        Export to CSV
        </Button>
        </Stack>
            <div className="ag-theme-material" style={{height: 735, width: '100%'}}>
                <AgGridReact
                    ref={gridRef}
                    rowData={training}
                    columnDefs={traincolumns}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellFocus={true}>
                    </AgGridReact>
                    
            </div>
            <Snackbar 
       open={open}
       autoHideDuration={3000}
       onClose={() => setOpen(false)}
       message='Training was deleted successfully'
       />
        </>
    );
    }


    export default TrainingList;