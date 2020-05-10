import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, shallowEqual } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, Typography, Button, Paper, Divider, Avatar, ButtonGroup, IconButton, CardMedia, CircularProgress } from '@material-ui/core';
import LogInForm from "../components/LogInForm";
import SignUpFrom from '../components/SignUpForm';
import { FEED_PAGE, PROFILE_PAGE, PAGINATION_INITAL_PAGE, PAGINATION_OFFSET } from '../helpers/constants';
import { Grid } from "@material-ui/core";
import { SettingsOutlined, FindInPageRounded } from '@material-ui/icons';
import { paginatePosts } from '../services/postService';
import base64 from "base-64";
import Post from '../components/Post';

const useStyles = makeStyles({
    root: {
        width: '40%',
        marginTop: 20
    },
    item: {
        marginTop: '50%',
        textAlign: 'center'
    },
    textNoPosts: {
        color: "#FFFFFF"
    }
});

const FeeedPageContent = () => {
    const user = useSelector(state => state.userReducer.user);
    let posts = useSelector(state => state.postsReducer.posts, shallowEqual);

    const classes = useStyles();

    useEffect(() => {
        paginatePosts(user.username, PAGINATION_INITAL_PAGE, PAGINATION_OFFSET);
    }, []);

    const _renderPosts = () => {
        if (posts == null || posts.length === 0) {
            return <div className={classes.item}><Typography className={classes.textNoPosts} variant="h2">No posts found.</Typography></div>;
        }

        let items = [];
        posts.map((post, index) => {
            items.push(<Post key={index} user={user} post={post} isPreview={false} />);
        });
        return items;
    }

    return (
        <div className={classes.root}>
            {_renderPosts()}
        </div>
    );
}

export default FeeedPageContent;