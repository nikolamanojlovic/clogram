import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Popover, TextField, Divider, Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { AccountCircleOutlined, AccountCircle, ExitToAppOutlined, AddPhotoAlternateOutlined, HomeOutlined, Home, AddPhotoAlternate } from '@material-ui/icons';
import SearchForm from './SearchForm';
import { logOut } from '../services/userService';
import { FEED_PAGE, PROFILE_PAGE, UPLOAD_IMAGE_PAGE } from '../helpers/constants';
import { store } from '../store';
import { changePageAction } from '../actions/pageActions';
import UploadImagePopover from './UploadImagePopover';

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
    },
    popover: {
        marginTop: '15px',
        textAlign: 'center',
        maxHeight: 1000,
        minWidth: 1000
    },
    divider: {
        margin: 'auto',
        marginTop: '10px',
        marginBottom: '10px',
        width: '90%'
    },
    file: {
        marginTop: '10px',
        width: '90%'
    },
    share: {
        marginBottom: '10px',
        fontWeight: 'normal',
        background: 'transparent'
    },
    textField: {
        width: '90%'
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
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();

    const _handleOpenPopup = (e) => {
        e.preventDefault();
        setAnchorEl(e.currentTarget)
    }

    const _handleClosePopup = () => {
        console.log("close")
        setAnchorEl(null)
    }

    return (
        <AppBar className={classes.root} position="sticky">
            <Toolbar className={classes.toolbar}>
                <Typography className={classes.logo} variant='h4' onClick={(e) => _changePage(e, FEED_PAGE)}>Clogram</Typography>
                <SearchForm />
                <ButtonGroup className={classes.buttonGroup}>
                    <IconButton onClick={(e) => _handleOpenPopup(e)}>
                        {Boolean(anchorEl) ? <AddPhotoAlternate className={classes.icon} /> : <AddPhotoAlternateOutlined className={classes.icon} />}
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
                <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={_handleClosePopup}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }} transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }} className={classes.popover}>
                    <input className={classes.file} type="file" name="image" accept="image/*" />
                    <Divider className={classes.divider} />
                    <TextField id="upload-description" className={classes.textField} variant="outlined" placeholder="Add description" rows={4} rowsMax={4} multiline />
                    <Divider className={classes.divider} />
                    <Button className={classes.share}>Share</Button>
                </Popover>
            </Toolbar>
        </AppBar>
    );
}

export default TopNavigation;