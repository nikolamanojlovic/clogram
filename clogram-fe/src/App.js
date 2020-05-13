import React, { Fragment } from 'react';
import './App.css';
import { useSelector } from "react-redux";
import LogInPage from "./pages/LogInPage";
import NavigationBar from "./components/NavigationBar";
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import FeedPage from './pages/FeedPage';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    height: '100vh',
    overflowX: 'hidden',
    overflowY: 'scroll',
    background: 'linear-gradient(45deg, #67b26f, #4ca2cd)'
  },
  grid: {
    minHeight: '100%',
    overflowX: 'hidden',
    overflowY: 'hidden'
  }
});

const App = () => {
  const user = useSelector(state => state.userReducer.user);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {user ? <NavigationBar /> : <Fragment />}
      <Grid className={classes.grid}
        container
        spacing={0}
        direction='column'
        justify='flex-start'
        alignItems='center'
      >
        {user ? <FeedPage /> : <LogInPage />}
      </Grid>
    </div>
  );
}

export default App;