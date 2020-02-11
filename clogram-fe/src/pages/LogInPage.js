import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import LogInForm from "../components/LogInForm";
import SignUpFrom from '../components/SignUpForm';

const useStyles = makeStyles({
    root: {
        maxWidth: '25%',
        height: '80%'
    },
    content: {
        padding: 5
    },
    button: {
        fontWeight: 'normal',
        background: 'transparent'
    },
    buttonSelected: {
        background: 'transparent'
    }
});

const LogInPage = () => {
    const [showLogin, setShowLogin] = useState(true);
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.content}>
                <Typography variant="h4" gutterBottom>
                    Clogram
                </Typography>
                <Typography variant="subtitle2">
                    Instagram alike app developed as project for Napredne softverske tehnologije
                </Typography>
            </CardContent>
            <CardContent className={classes.content}>
                <Button className={showLogin ? classes.buttonSelected : classes.button} onClick={() => setShowLogin(true)}>Log in</Button>
                <Button className={showLogin ? classes.button : classes.buttonSelected} onClick={() => setShowLogin(false)}>Sign up</Button>
            </CardContent>
            <CardContent className={classes.content}>
                {showLogin ? <LogInForm /> : <SignUpFrom />}
            </CardContent>
        </Card>
    );
}

export default LogInPage;