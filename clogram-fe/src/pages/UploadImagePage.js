import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button, Paper, Divider, Avatar, ButtonGroup, IconButton } from '@material-ui/core';
import LogInForm from "../components/LogInForm";
import SignUpFrom from '../components/SignUpForm';
import { FEED_PAGE, PROFILE_PAGE } from '../helpers/constants';
import { Grid, TextField } from "@material-ui/core";
import { SettingsOutlined } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        margin: 'auto',
        minWidth: '30%',
    },
    content: {
        padding: 5
    },
    formControl: {
        width: '100%',
        alignItems: 'center'
    },
    textField: {
        minWidth: '90%',
        margin: 10,
    },
    item: {
        margin: '20px',
        textAlign: 'left'
    },
    info: {
        marginRight: '15px',
        cursor: 'default'
    },
});

const UploadImagePage = () => {
    const user = useSelector(state => state.userReducer.user);
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.content}>
                <form className={classes.formControl}>
                    <Typography className={classes.info} variant="h6">
                        Upload photo:
                    </Typography>
                    <Typography className={classes.info} variant="h6">
                        Add description:
                    </Typography>
                    <TextField id="upload-description" className={classes.textField} variant="outlined" rows={4} rowsMax={4} multiline />
                </form>
            </CardContent>
        </Card>
    );
}

export default UploadImagePage;