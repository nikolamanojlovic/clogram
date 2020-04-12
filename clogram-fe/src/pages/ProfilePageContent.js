import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button, Paper, Divider } from '@material-ui/core';
import LogInForm from "../components/LogInForm";
import SignUpFrom from '../components/SignUpForm';
import { FEED_PAGE, PROFILE_PAGE } from '../helpers/constants';
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        width: '60%',
        marginTop: '20px',
        backgroundColor: '#FFFFFF'
    },
    container: {
        width: '90%'
    },
    divider: {
        marginTop: '20px',
        marginBottom: '20px',
        width: '90%'
    }
});

const ProfilePageContent = () => {
    const user = useSelector(state => state.userReducer.user);
    const classes = useStyles();

    return (
        <Grid className={classes.root}
            container
            direction="column"
            justify="flex-start"
            alignItems="center">
            <Grid className={classes.container} container>
                <Grid item>
                </Grid>
                <Grid item>
                    <Typography variant="h5" gutterBottom>{user.username}</Typography>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid className={classes.container} container>
                <Grid item>
                    <Typography variant="h6" gutterBottom>No posts yet.</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ProfilePageContent;