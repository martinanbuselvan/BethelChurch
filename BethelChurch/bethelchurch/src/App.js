import logo from './logo.svg';
import './App.css';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import BCAppBar from './Layouts/AppBar'
import Members from './Components/Members';
const useStyles = makeStyles((theme) => ({
  root: {
    //flexGrow: 1,
    width: '100%',
  },
  paper: {
   // padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
    height: '100%'
  },
}));

function App() {
  const classes = useStyles();
  return (
   
      <Grid className={classes.paper}>
        <Grid container>
          <BCAppBar />
        </Grid>
        <Grid container >
          <Members /></Grid>

      </Grid>
    
  );
}

export default App;
