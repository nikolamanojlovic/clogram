import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { AccountCircleOutlined, ExitToAppOutlined, AddPhotoAlternateOutlined } from '@material-ui/icons';
import SearchForm from './SearchForm';
import { logOut } from '../services/userService';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#FFFFFF',
    },
    toolbar: {
        backgroundColor: '#FFFFFF',
        width: '60%',
        margin: 'auto',
    },
    logo: {
        fontSize: 25,
        marginLeft: 5,
        paddingLeft: 5,
        color: '#000000',
    },
    buttonGroup: {
    },
    icon: {
        color: '#000000'
    }
});

const _logOut = (e) => {
    e.preventDefault();
    logOut();
}

const TopNavigation = () => {
    const classes = useStyles();

    return (
        <AppBar className={classes.root} position="sticky">
            <Toolbar className={classes.toolbar}>
                <Typography className={classes.logo} variant='h4'>Clogram</Typography>
                <SearchForm />
                <ButtonGroup className={classes.buttonGroup}>
                    <IconButton>
                        <AddPhotoAlternateOutlined className={classes.icon} />
                    </IconButton>
                    <IconButton>
                        <AccountCircleOutlined className={classes.icon} />
                    </IconButton>
                    <IconButton onClick={(e) => _logOut(e)}>
                        <ExitToAppOutlined className={classes.icon} />
                    </IconButton>
                </ButtonGroup>
            </Toolbar>
        </AppBar>
    );
}

export default TopNavigation;