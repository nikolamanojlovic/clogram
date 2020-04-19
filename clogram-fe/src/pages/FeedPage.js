import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button, Paper } from '@material-ui/core';
import LogInForm from "../components/LogInForm";
import SignUpFrom from '../components/SignUpForm';
import { FEED_PAGE, PROFILE_PAGE } from '../helpers/constants';
import { Grid } from "@material-ui/core";
import ProfilePageContent from './ProfilePageContent';

const _renderPage = (page) => {
    switch (page) {
        case PROFILE_PAGE:
            return <ProfilePageContent />;
        default:
            return <div><Paper>FEED_PAGE</Paper><Paper>PROFILE_PAGE</Paper></div>;
    }
}

const FeedPage = () => {
    const currentPage = useSelector(state => state.pageReducer.currentPage);

    return (
        _renderPage(currentPage)
    );
}

export default FeedPage;