import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import LogInForm from "../components/LogInForm";
import SignUpFrom from '../components/SignUpForm';

const useStyles = makeStyles({
    root: {
        maxWidth: "25%",
        height: 600,
    },
    controls: {
        margin: 5
    }
});

const LogInPage = () => {
    const [showLogin, setShowLogin] = useState(true);
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    Clogram
                </Typography>
                <Typography variant="subtitle2">
                    Instagram alike app developed as project for Napredne softverske tehnologije
                </Typography>
            </CardContent>
            <CardContent className={classes.controls}>
                <Button onClick={() => setShowLogin(true)}>Log in</Button>
                <Button onClick={() => setShowLogin(false)}>Sign up</Button>
            </CardContent>
            <CardContent className={classes.controls}>
                {showLogin ? <LogInForm/> : <SignUpFrom/>}
            </CardContent>
        </Card>
    );
}

export default LogInPage;