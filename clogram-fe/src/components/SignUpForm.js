import React, {useState} from 'react';
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
        width: '75%'
    }
});

const SignUpFrom = () => {
    const [values, setValues] = useState({
        showPassword: false
    });
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <TextField id="signup-username" className={classes.textField} placeholder="Username" variant="outlined" size="small" />
            <TextField id="signup-first-name" className={classes.textField} placeholder="First name" variant="outlined" size="small" />
            <TextField id="signup-last-name" className={classes.textField} placeholder="Last name" variant="outlined" size="small" />
            <TextField id="signup-email" className={classes.textField} placeholder="Email" variant="outlined" size="small" />
            <TextField id="signup-password" className={classes.textField} placeholder="Password" variant="outlined" size="small" type={values.showPassword ? 'text' : 'password'}/>
            <Button variant="contained" color="primary">
                Sign Up
            </Button>
        </FormControl>
    );
}

export default SignUpFrom;