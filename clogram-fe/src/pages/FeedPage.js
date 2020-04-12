import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button, Paper } from '@material-ui/core';
import LogInForm from "../components/LogInForm";
import SignUpFrom from '../components/SignUpForm';
import { FEED_PAGE, PROFILE_PAGE } from '../helpers/constants';
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        backgroundColor: '#FFFFFF'
    }
});

const _renderPage = (page) => {
    switch (page) {
        case PROFILE_PAGE:
            return <div><Paper>PROFILE_PAGE</Paper><Paper>PROFILE_PAGE</Paper></div> ;
        default:
            return <div><Paper>FEED_PAGE</Paper><Paper>PROFILE_PAGE</Paper></div>;
    }
}

const FeedPage = () => {
    const currentPage = useSelector(state => state.pageReducer.currentPage);
    const classes = useStyles();

    return (
        <Grid className={classes.root}
            item
            item xs={12}
            direction="column"
            justify="flex-start"
            alignItems="center">
            {_renderPage(currentPage)}
        </Grid>
    );
}

export default FeedPage;