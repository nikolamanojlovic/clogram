import React, { Fragment } from 'react';
import './App.css';
import { useSelector } from "react-redux";
import LogInPage from "./pages/LogInPage";
import NavigationBar from "./components/NavigationBar";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    background: '#67b26f',
    background: 'linear-gradient(45deg, #67b26f, #4ca2cd)'
  }
});

const App = () => {
  const user = useSelector(state => state.user);
  const classes = useStyles();

  return (
    <div className="App" className={classes.root}>
      {user ? <NavigationBar /> : <Fragment />}
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justify='center'
        style={{ minHeight: '100vh' }}
      >
        {user ? <p>filled</p> : <LogInPage />}
      </Grid>
    </div>
  );
}

export default App;