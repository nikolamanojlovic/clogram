import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, TextField, Button } from '@material-ui/core';

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

const LogInForm = () => {
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <TextField id="login-username" className={classes.textField} placeholder="Username" variant="outlined" size="small" />
            <TextField id="login-password" className={classes.textField} placeholder="Password" variant="outlined" size="small" />
            <Button className={classes.button} variant="contained" color="primary">
                Log In
            </Button>
        </FormControl>
    );
}

export default LogInForm;