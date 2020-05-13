import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { logIn } from '../services/userService';
import ErrorMessage from './ErrorMessage';

const useStyles = makeStyles({
    formControl: {
        width: '100%',
        alignItems: 'center'
    },
    textField: {
        marginBottom: 10,
        width: '75%'
    },
    button: {
        width: '30%',
        marginTop: 10
    }
});

const _logIn = (e, username, password) => {
    e.preventDefault();
    logIn(username, password);
}

const LogInForm = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    return (
        <form className={classes.formControl}>
            <TextField id="login-username" className={classes.textField} placeholder="Username" variant="outlined" size="small"
                value={values.username} onChange={(e) => setValues({ username: e.target.value, password: values.password })} />
            <TextField id="login-password" className={classes.textField} placeholder="Password" variant="outlined" type="password" size="small"
                value={values.password} onChange={(e) => setValues({ username: values.username, password: e.target.value })} />
            <ErrorMessage />
            <Button className={classes.button} variant="contained" color="primary" type="submit" onClick={(e) => _logIn(e, values.username, values.password)}>
                Log In
            </Button>
        </form>
    );
}

export default LogInForm;