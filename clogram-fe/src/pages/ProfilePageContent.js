import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button, Paper, Divider, Avatar, ButtonGroup, IconButton } from '@material-ui/core';
import LogInForm from "../components/LogInForm";
import SignUpFrom from '../components/SignUpForm';
import { FEED_PAGE, PROFILE_PAGE } from '../helpers/constants';
import { Grid } from "@material-ui/core";
import { SettingsOutlined, CameraOutlined, ImageSearchOutlined, ImageSearchTwoTone, ImageSearchRounded } from '@material-ui/icons';
import { fetchFriendsForUser } from '../services/userService';
import { fetchPostsForUser } from '../services/postService';
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
    }
});

const ProfilePageContent = () => {
    const user = useSelector(state => state.userReducer.user);
    const friends = useSelector(state => state.userReducer.friends);
    const posts = useSelector(state => state.postsReducer.usersPosts);

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
                    <Post post={post} isPreview={true} />
                );
            });
            return items;
        }
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
                        <Avatar className={classes.avatar} alt="user.username" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                    </Grid>
                    <Grid className={classes.item} item>
                        <div className={classes.block}>
                            <Typography className={classes.username} variant="h5" gutterBottom>{user.username}</Typography>
                            <IconButton className={classes.icon}>
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
                   posts == null || posts.length === 0 ? <div className={classes.itemNoPosts}><ImageSearchRounded className={classes.iconNoPosts} /></div> : <span/>
                }
            </Grid>
            <div className={classes.wrapper}>
                {_renderPosts()}
            </div>
        </Fragment>
    );
}

export default ProfilePageContent;