import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button, Paper, Divider, Avatar, ButtonGroup, IconButton, Popover } from '@material-ui/core';
import LogInForm from "../components/LogInForm";
import SignUpFrom from '../components/SignUpForm';
import { FEED_PAGE, PROFILE_PAGE } from '../helpers/constants';
import { Grid } from "@material-ui/core";
import { SettingsOutlined, CameraOutlined, ImageSearchOutlined, ImageSearchTwoTone, ImageSearchRounded } from '@material-ui/icons';
import { fetchFriendsForUser, deleteUser } from '../services/userService';
import { fetchPostsForUser, uploadProfilePicture } from '../services/postService';
import Post from '../components/Post';

const useStyles = makeStyles({
    root: {
        width: '60%',
        marginTop: '20px',
        backgroundColor: '#FFFFFF'
    },
    container: {
        marginTop: '10px',
        marginBottom: '20px',
        height: '100%',
        width: '90%'
    },
    item: {
        margin: '20px',
        textAlign: 'left'
    },
    divider: {
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
    },
    itemNoPosts: {
        paddingTop: '5%',
        paddingBottom: '5%',
        textAlign: 'center'
    },
    iconNoPosts: {
        fontSize: 50,
        display: 'block',
        color: '#4ca2cd'
    },
    textNoPosts: {
        color: "#FFFFFF"
    },
    wrapper: {
        maxWidth: '60%',
        float: 'left',
        backgroundColor: "#FFFFFF",
        paddingTop: 20
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
    buttonPopover: {
        color: '#000000',
        fontWeight: 'normal',
        background: 'transparent',
        textTransform: 'none',
        display: 'block',
        margin: 5,
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    buttonPopoverUpload: {
        color: '#000000',
        display: 'block',
        textAlign: 'left',
        fontSize: '0.875rem',
        margin: 10
    },
    buttonPopoverDanger: {
        color: '#ff1744'
    },
    uploader: {
        display: 'none'
    }
});

const _renderProfilePhoto = (photo) => {

    if (photo == null) {
        return;
    }
    return "data:image/jpeg;base64," + Buffer.from(photo).toString("base64");
}

const ProfilePageContent = () => {
    const user = useSelector(state => state.userReducer.user);
    const friends = useSelector(state => state.userReducer.friends);
    const posts = useSelector(state => state.postsReducer.usersPosts);

    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        fetchFriendsForUser(user.username)
    }, []);

    useEffect(() => {
        fetchPostsForUser(user.username)
    }, []);

    const classes = useStyles();

    const _renderPosts = () => {
        if (posts != null && posts.length > 0) {
            let items = [];
            posts.map(post => {
                items.push(
                    <Post user={user} post={post} isPreview={true} />
                );
            });
            return items;
        }
    }

    const _handlePopup = (e) => {
        setAnchorEl(anchorEl != null ? null : e.currentTarget);
    }

    const _handleClosePopup = () => {
        setAnchorEl(null)
    }

    const _deleteProfile = (e) => {
        e.preventDefault();
        deleteUser(user.username);
    }

    const _uploadProfilePhoto = (e) => {
        e.preventDefault();

        let image = document.getElementById("profile-image").files[0];
        console.log(image)
        uploadProfilePicture(user.username, image);
    }

    const _renderPopover = () => {
        return (
            <Popover className={classes.popover} open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={_handleClosePopup}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }} transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                PaperProps={{ className: classes.paper }}>
                <label className={classes.buttonPopoverUpload}>
                    <span>Upload profile photo</span>
                    <input id="profile-image" className={classes.uploader} type="file" name="image" accept="image/*" onChange={(e) => _uploadProfilePhoto(e)} />
                </label>
                <Button className={`${classes.buttonPopover} ${classes.buttonPopoverDanger}`} type="submit" disableRipple={true} onClick={(e) => _deleteProfile(e)}>
                    Delete profile
            </Button>
            </Popover>
        );
    }

    return (
        <Fragment>
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
                        <Avatar className={classes.avatar} src={_renderProfilePhoto(user.profile_photo)} />
                    </Grid>
                    <Grid className={classes.item} item>
                        <div className={classes.block}>
                            <Typography className={classes.username} variant="h5" gutterBottom>{user.username}</Typography>
                            <IconButton className={classes.icon} onClick={(e) => _handlePopup(e)}>
                                <SettingsOutlined />
                            </IconButton>
                        </div>
                        <Typography className={classes.info} variant="subtitle1" gutterBottom>
                            {posts == null ? 0 : posts.length} posts
                    </Typography>
                        <Typography className={classes.info} variant="subtitle1" gutterBottom>
                            {friends == null ? 0 : friends.length} friends
                    </Typography>
                        <Typography className={classes.name} variant="subtitle1" gutterBottom>{user.first_name + ' ' + user.last_name}</Typography>
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                {
                    posts == null || posts.length === 0 ? <div className={classes.itemNoPosts}><ImageSearchRounded className={classes.iconNoPosts} /></div> : <span />
                }
            </Grid>
            <div className={classes.wrapper}>
                {_renderPosts()}
            </div>
            {_renderPopover()}
        </Fragment>
    );
}

export default ProfilePageContent;