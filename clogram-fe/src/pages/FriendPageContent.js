import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, shallowEqual } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button, Paper, Divider, Avatar, ButtonGroup, IconButton, Popover, CircularProgress } from '@material-ui/core';
import LogInForm from "../components/LogInForm";
import SignUpFrom from '../components/SignUpForm';
import { FEED_PAGE, PROFILE_PAGE } from '../helpers/constants';
import { Grid } from "@material-ui/core";
import { SettingsOutlined, CameraOutlined, ImageSearchOutlined, ImageSearchTwoTone, ImageSearchRounded, PersonAddOutlined, PersonAddDisabledOutlined } from '@material-ui/icons';
import { fetchFriendsForUser, deleteUser, fetchUser, fetchFriendsForFriend, follow, unfollow } from '../services/userService';
import { fetchPostsForUser, fetchPostsForFriend } from '../services/postService';
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
    buttonPopoverDanger: {
        color: '#ff1744'
    }
});

const FriendPageContent = () => {
    const currentUser = useSelector(state => state.userReducer.user);
    const friend = useSelector(state => state.userReducer.friend);
  
    const [user, setUser] = useState(undefined);
    const [friends, setFriends] = useState(undefined);
    const [isFriend, setIsFriend] = useState(false);
    const [posts, setPosts] = useState(undefined);

    useEffect(() => {
        fetchUser(friend).then((data) => {
            setUser(data);
        });
    }, friend);

    useEffect(() => {
        fetchFriendsForFriend(friend).then((data) => {
            setFriends(data);
        });
    }, friend);

    useEffect(() => {
        fetchFriendsForFriend(currentUser.username).then((data) => {
            setIsFriend(data.some(el => el.username === friend));
        });
    }, []);

    useEffect(() => {
        fetchPostsForFriend(friend).then((data) => {
            setPosts(data)
        });
    }, friend);

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

    const _follow = (e) => {
        e.preventDefault();

        if (!isFriend) {
            follow(currentUser.username, friend);
            setIsFriend(true);
        } else {
            unfollow(currentUser.username, friend);
            setIsFriend(false);
        }
    }

    const _render = () => {
        if (user) {
            return <Fragment>
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
                                <IconButton className={classes.icon} onClick={(e) => _follow(e)}>
                                    {isFriend ? <PersonAddDisabledOutlined/> : <PersonAddOutlined />}
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
            </Fragment>
        }
        return <CircularProgress />
    }

    return (
        _render()
    );
}

export default FriendPageContent;