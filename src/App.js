import './App.css';
import { Routes, Route, Outlet, Link, BrowserRouter as Router } from "react-router-dom";
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import Chart from './components/Chart';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack';
import { Paper } from '@mui/material';




const linkStyle = {
  margin: "2rem",
  textDecoration: 'underline white',
  color: 'white'
};


function App() {
  return (
    <div className="Car shop">
<Paper>
      <AppBar position="static">

    

<Router>
<Stack direction="row" spacing={2} sx={{ backgroundColor: "warning.main", borderRadius: 2 }}>

      <Link to='/components/customers' style={linkStyle}>Customers</Link>{' '}
      <Link to='/components/trainings' style={linkStyle}>Trainings</Link>{' '}
      <Link to='/components/chart' style={linkStyle}>Chart</Link>
      </Stack>

      <Routes>
        <Route path='/components/customers' element={<Customers />}/>
        <Route path='/components/trainings' element={<Trainings />}/>
        <Route path='/components/chart' element={<Chart />}/>


      </Routes>

  </Router>
  
  </AppBar>
  </Paper>
      </div>
  );
}






export default App;
