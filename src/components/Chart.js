import React, {useState, useEffect} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Paper } from '@mui/material';
import {groupBy} from 'lodash';

export default function Chart ({data}) {

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => {setTraining(data)})
        .catch(err => console.error(err))
        }

        useEffect(() => {
            fetchTrainings();
            }, []);


        const [training, setTraining] = useState({
                date: '',
                duration: '',
                activity: '',

        });
        
        const groups = groupBy(training => training.activity);


return (
    <Paper>
<LineChart width={1000} height={400} data={training}>
    <Line type="monotone" dataKey="duration" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey='groups' />
    <YAxis />
  </LineChart>
  </Paper>

);
}
