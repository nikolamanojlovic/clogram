import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, TextField, Button, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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

const SignUpFrom = () => {
    const [values, setValues] = useState({
        showPassword: false
    });
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl} margin='dense'>
            <TextField id="signup-username" className={classes.textField} placeholder="Username" variant="outlined" size="small" />
            <TextField id="signup-first-name" className={classes.textField} placeholder="First name" variant="outlined" size="small" />
            <TextField id="signup-last-name" className={classes.textField} placeholder="Last name" variant="outlined" size="small" />
            <TextField id="signup-email" className={classes.textField} placeholder="Email" variant="outlined" size="small" />
            <OutlinedInput id="signup-password" className={classes.textField} placeholder="Password" type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setValues({ showPassword: !values.showPassword })}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                        >
                            {values.showPassword ? <Visibility fontSize='small'/> : <VisibilityOff fontSize='small'/>}
                        </IconButton>
                    </InputAdornment>
                } size="small"/>
            <Button className={classes.button} variant="contained" color="primary">
                Sign Up
            </Button>
        </FormControl>
    );
}

export default SignUpFrom;