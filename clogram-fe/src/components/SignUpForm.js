import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ErrorMessage from './ErrorMessage';
import { addMessageAction } from '../actions/messageActions';
import { signUp } from '../services/userService';
import { store } from '../store';

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

const _signUp = (e, username, firstName, lastName, email, password) => {
    e.preventDefault();
    if (username === "" || firstName === "" || lastName === "" || email === "" || password === "") {
        store.dispatch(addMessageAction("sign.up.mandatory.error"))
    } else {
        signUp(username, firstName, lastName, email, password);
    }
}

const SignUpFrom = () => {
    const [values, setValues] = useState({
        showPassword: false,
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const classes = useStyles();

    return (
        <form className={classes.formControl}>
            <TextField id="signup-username" className={classes.textField} placeholder="Username" variant="outlined" size="small"
                value={values.username}
                onChange={(e) => setValues({ username: e.target.value, firstName: values.firstName, lastName: values.lastName, email: values.email, password: values.password })} />
            <TextField id="signup-first-name" className={classes.textField} placeholder="First name" variant="outlined" size="small"
                value={values.firstName}
                onChange={(e) => setValues({ username: values.username, firstName: e.target.value, lastName: values.lastName, email: values.email, password: values.password })} />
            <TextField id="signup-last-name" className={classes.textField} placeholder="Last name" variant="outlined" size="small"
                value={values.lastName}
                onChange={(e) => setValues({ username: values.username, firstName: values.firstName, lastName: e.target.value, email: values.email, password: values.password })} />
            <TextField id="signup-email" className={classes.textField} placeholder="Email" variant="outlined" size="small"
                value={values.email}
                onChange={(e) => setValues({ username: values.username, firstName: values.firstName, lastName: values.lastName, email: e.target.value, password: values.password })} />
            <OutlinedInput id="signup-password" className={classes.textField} placeholder="Password" type={values.showPassword ? 'text' : 'password'} margin="dense"
                value={values.password}
                onChange={(e) => setValues({ username: values.username, firstName: values.firstName, lastName: values.lastName, email: values.email, password: e.target.value })}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setValues({ showPassword: !values.showPassword })}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end">
                            {values.showPassword ? <Visibility fontSize='small' /> : <VisibilityOff fontSize='small' />}
                        </IconButton>
                    </InputAdornment>
                } size="small" />
            <ErrorMessage />
            <Button className={classes.button} variant="contained" color="primary"
                onClick={e => _signUp(e, values.username, values.firstName, values.lastName, values.email, values.password)}>
                Sign Up
            </Button>
        </form>
    );
}

export default SignUpFrom;