import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button, Paper, Divider, Avatar, ButtonGroup, IconButton, Input, CardHeader, Popover } from '@material-ui/core';
import LogInForm from "../components/LogInForm";
import SignUpFrom from '../components/SignUpForm';
import { FEED_PAGE, PROFILE_PAGE } from '../helpers/constants';
import { Grid, TextField } from "@material-ui/core";
import { SettingsOutlined } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
    }
});

const CommentPopover = (props) => {
    const classes = useStyles();

    return (
        <Popover open={props.open} anchorEl={props.anchorEl} onClose={props.handleClosePopover} anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
        }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            className={classes.root}>
        </Popover>
    );
}

export default CommentPopover;