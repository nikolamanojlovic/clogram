import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import LogInForm from "../components/LogInForm";
import SignUpFrom from '../components/SignUpForm';

const useStyles = makeStyles({
    root: {
        maxWidth: '25%',
        backgroundColor: '#FFFFFF'
    }
});

const FeedPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography> TEst</Typography>
        </div>
    );
}

export default FeedPage;