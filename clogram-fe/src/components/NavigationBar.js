import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import CameraIcon from '@material-ui/icons/Camera';

const useStyles = makeStyles({
    root: {
        height: 60,
        backgroundColor: '#FFFFFF'
    },
    toolbar: {
    },
    logo: {
        fontSize: 30,
        marginLeft: 5,
        paddingLeft: 5,
        color: '#000000',
        borderLeft: '1px solid #000000'
    },
    logoIcon: {
        color: '#000000'
    }
});

const TopNavigation = () => {
    const classes = useStyles();

    return (
        <AppBar className={classes.root} position='static'>
            <Toolbar className={classes.root}>
                <Fragment>
                    <CameraIcon className={classes.logoIcon}/>
                    <Typography className={classes.logo} variant='h4'>
                        Clogram
                    </Typography>
                </Fragment>
            </Toolbar>
        </AppBar>
    );
}

export default TopNavigation;