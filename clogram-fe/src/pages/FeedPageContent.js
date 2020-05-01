import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, Typography, Button, Paper, Divider, Avatar, ButtonGroup, IconButton, CardMedia } from '@material-ui/core';
import LogInForm from "../components/LogInForm";
import SignUpFrom from '../components/SignUpForm';
import { FEED_PAGE, PROFILE_PAGE } from '../helpers/constants';
import { Grid } from "@material-ui/core";
import { SettingsOutlined } from '@material-ui/icons';
import { paginatePosts } from '../services/postService';
import base64 from "base-64";

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

const _fetchPosts = (username, page, offset) => {
    paginatePosts(username, page, offset);
}

const FeeedPageContent = () => {
    const user = useSelector(state => state.userReducer.user);
    const posts = useSelector(state => state.postsReducer.posts);
    const classes = useStyles();

    const _renderPost = (post) => {
        if ( post.photo== null) {
            return;
        }
        console.log(Buffer.from(post.photo).toString("base64"));
        let src = "data:image/jpeg;base64," + Buffer.from(post.photo).toString("base64");
        console.log(src)

        return <img style={{width: 300, height: 300}} src={src} />;
    }

    const _renderPosts = () => {
        if (posts === null) {
            return <Grid item className={classes.item} xs={3}>
                <Typography>NO POSTS</Typography>
            </Grid>;
        }

        let items = [];
        posts.map(post => {
            items.push(<Grid item className={classes.item} xs={12}>
                {_renderPost(post)}
            </Grid>);
        });
        return items;
    }

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
                </Grid>
                {_renderPosts()}
                {/* {_fetchPosts(user.username, 0, 200)} */}
            </Grid>
        </Grid>
    );
}

export default FeeedPageContent;