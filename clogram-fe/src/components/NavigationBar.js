import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Popover, TextField, Divider, Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { AccountCircleOutlined, AccountCircle, ExitToAppOutlined, AddPhotoAlternateOutlined, HomeOutlined, Home, AddPhotoAlternate } from '@material-ui/icons';
import SearchForm from './SearchForm';
import { logOut } from '../services/userService';
import { FEED_PAGE, PROFILE_PAGE } from '../helpers/constants';
import { store } from '../store';
import { changePageAction } from '../actions/pageActions';
import { createPost } from '../services/postService';
import { setFriendAction } from '../actions/userActions';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 19px 20px 0px rgba(50,50,50,0.08)'
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
        marginRight: 65,
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
    paper: {
        boxShadow: '0px 19px 54px 0px rgba(50,50,50,0.08)'
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
    store.dispatch(setFriendAction(""));
    store.dispatch(changePageAction(page));
}

const _logOut = (e) => {
    e.preventDefault();
    logOut();
}

const TopNavigation = () => {
    const [currentPage, user] = useSelector(state => [state.pageReducer.currentPage, state.userReducer.user]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [description, setDescription] = useState("");
    const classes = useStyles();

    const _handleOpenPopup = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const _handleClosePopup = () => {
        setAnchorEl(null)
    }

    const _share = (e, username, description, currentPage) => {
        e.preventDefault();

        let image = document.getElementById("post-image").files[0];

        createPost(username, image, description, currentPage);
        _handleClosePopup();
    }

    const _renderPopover = () => {
        return (
            <Popover className={classes.popover} open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={_handleClosePopup}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }} transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                PaperProps={{ className: classes.paper }}>
                <input className={classes.file} id="post-image" type="file" name="image" accept="image/*" />
                <Divider className={classes.divider} />
                <TextField id="upload-description" className={classes.textField} variant="outlined" placeholder="Add description" value={description}
                    rows={4} rowsMax={4} multiline onChange={(e) => setDescription(e.target.value)} />
                <Divider className={classes.divider} />
                <Button className={classes.share} onClick={(e) => _share(e, user.username, description, currentPage)}>Share</Button>
            </Popover>
        );
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
                {_renderPopover()}
            </Toolbar>
        </AppBar>
    );
}

export default TopNavigation;