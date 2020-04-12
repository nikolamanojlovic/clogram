import React from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { AccountCircleOutlined, AccountCircle, ExitToAppOutlined, AddPhotoAlternateOutlined, HomeOutlined, Home, AddPhotoAlternate } from '@material-ui/icons';
import SearchForm from './SearchForm';
import { logOut } from '../services/userService';
import { FEED_PAGE, PROFILE_PAGE, UPLOAD_IMAGE_PAGE } from '../helpers/constants';
import { store } from '../store';
import { changePageAction } from '../actions/pageActions';

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
        cursor: 'pointer',
        userSelect: 'none'
    },
    buttonGroup: {
    },
    icon: {
        color: '#000000'
    }
});

const _changePage = (e, page) => {
    e.preventDefault();
    store.dispatch(changePageAction(page));
}

const _logOut = (e) => {
    e.preventDefault();
    logOut();
}

const TopNavigation = () => {
    const currentPage = useSelector(state => state.pageReducer.currentPage);
    const classes = useStyles();

    return (
        <AppBar className={classes.root} position="sticky">
            <Toolbar className={classes.toolbar}>
                <Typography className={classes.logo} variant='h4' onClick={(e) => _changePage(e, FEED_PAGE)}>Clogram</Typography>
                <SearchForm />
                <ButtonGroup className={classes.buttonGroup}>
                    <IconButton onClick={(e) => _changePage(e, UPLOAD_IMAGE_PAGE)}>
                        {currentPage === UPLOAD_IMAGE_PAGE ? <AddPhotoAlternate className={classes.icon} /> : <AddPhotoAlternateOutlined className={classes.icon} />}
                    </IconButton>
                    <IconButton onClick={(e) => _changePage(e, FEED_PAGE)}>
                        {currentPage === FEED_PAGE ? <Home className={classes.icon} /> : <HomeOutlined className={classes.icon} />}
                    </IconButton>
                    <IconButton onClick={(e) => _changePage(e, PROFILE_PAGE)}>
                        {currentPage === PROFILE_PAGE ? <AccountCircle className={classes.icon} /> : <AccountCircleOutlined className={classes.icon} />}
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