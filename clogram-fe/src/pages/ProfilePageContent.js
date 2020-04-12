import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button, Paper, Divider, Avatar, ButtonGroup, IconButton } from '@material-ui/core';
import LogInForm from "../components/LogInForm";
import SignUpFrom from '../components/SignUpForm';
import { FEED_PAGE, PROFILE_PAGE } from '../helpers/constants';
import { Grid } from "@material-ui/core";
import { SettingsOutlined } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        width: '60%',
        marginTop: '20px',
        backgroundColor: '#FFFFFF'
    },
    container: {
        marginTop: '10px',
        height: '100%',
        width: '90%'
    },
    item: {
        margin: '20px',
        textAlign: 'left'
    },
    divider: {
        marginBottom: '20px',
        width: '90%'
    },
    avatar: {
        minHeight: '100px',
        minWidth: '100px',
        margin: 'auto'
    },
    username: {
        display: 'inline-block',
        cursor: 'default'
    },
    info: {
        display: 'inline-block',
        marginRight: '15px',
        cursor: 'default'
    },
    name: {
        fontWeight: 'bold',
        cursor: 'default'
    },
    button: {
        fontWeight: 'normal',
        background: 'transparent'
    },
    block: {
        display: 'block'
    },
    icon: {
        padding: 0,
        marginLeft: '5px',
        paddingBottom: '5px',
        color: '#000000'
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
            <Grid className={classes.container}
                container
                spacing={0}
                direction="row"
                justify="flex-start"
                alignItems="center">
                <Grid item className={classes.item} xs={3}>
                    <Avatar className={classes.avatar} alt="user.username" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                </Grid>
                <Grid className={classes.item} item>
                    <div className={classes.block}>
                        <Typography className={classes.username} variant="h5" gutterBottom>{user.username}</Typography>
                        <IconButton className={classes.icon}>
                            <SettingsOutlined />
                        </IconButton>
                    </div>
                    {/* replace test data */}
                    <Typography className={classes.info} variant="subtitle1" gutterBottom>
                        22 posts
                    </Typography>
                    <Typography className={classes.info} variant="subtitle1" gutterBottom>
                        780 friends
                    </Typography>
                    <Typography className={classes.name} variant="subtitle1" gutterBottom>{user.first_name + ' ' + user.last_name}</Typography>
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