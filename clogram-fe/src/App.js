import React, { Fragment } from 'react';
import './App.css';
import { useSelector } from "react-redux";
import LogInPage from "./pages/LogInPage";
import NavigationBar from "./components/NavigationBar";
import { Grid } from "@material-ui/core";

const App = () => {
  const user = useSelector(state => state.user);

  return (
    <div className="App">
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