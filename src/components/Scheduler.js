import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

import training from './Trainings';


export default function TrainingScheduler() {



return (
    <Paper>
        <Scheduler
          
        >
          <ViewState
            defaultCurrentDate="2022-04-30"
          />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
        </Scheduler>
      </Paper>
  );



}