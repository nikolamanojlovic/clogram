import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, Typography, Button, Paper, Divider, Avatar, ButtonGroup, IconButton, CardMedia } from '@material-ui/core';
import LogInForm from "../components/LogInForm";
import SignUpFrom from '../components/SignUpForm';
import { FEED_PAGE, PROFILE_PAGE, PAGINATION_INITAL_PAGE, PAGINATION_OFFSET } from '../helpers/constants';
import { Grid } from "@material-ui/core";
import { SettingsOutlined } from '@material-ui/icons';
import { paginatePosts } from '../services/postService';
import base64 from "base-64";
import Post from '../components/Post';

const useStyles = makeStyles({
    root: {
        width: '40%',
        marginTop: 20
    },
    item: {
        margin: '20px',
        textAlign: 'left'
    }
});

const FeeedPageContent = () => {
    const user = useSelector(state => state.userReducer.user);
    const posts = useSelector(state => state.postsReducer.posts);

    const classes = useStyles();

    useEffect(() => {
        paginatePosts(user.username, PAGINATION_INITAL_PAGE, PAGINATION_OFFSET);
    }, []);

    const _renderPosts = () => {
        if (posts === null) {
            return <Grid item className={classes.item} xs={3}><Typography>NO POSTS</Typography></Grid>;
        }

        let items = [];
        posts.map(post => {
            items.push(<Post post={post} isPreview={false} />);
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