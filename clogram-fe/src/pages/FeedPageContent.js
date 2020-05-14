import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CircularProgress } from '@material-ui/core';
import { PAGINATION_INITAL_PAGE, PAGINATION_OFFSET } from '../helpers/constants';
import { paginatePosts, fetchCommentsForPost } from '../services/postService';
import Post from '../components/Post';
import CommentPopover from '../components/CommentPopover';

const useStyles = makeStyles({
    root: {
        width: '40%',
        marginTop: 20
    },
    item: {
        marginTop: '55%',
        textAlign: 'center'
    },
    textNoPosts: {
        color: "#FFFFFF"
    },
    loader: {
        color: "#FFFFFF"
    }
});

const FeeedPageContent = () => {
    const user = useSelector(state => state.userReducer.user);
    let posts = useSelector(state => state.postsReducer.posts, shallowEqual);

    const [comments, setComments] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [post, setPost] = useState(null);

    const classes = useStyles();

    useEffect(() => {
        paginatePosts(user.username, PAGINATION_INITAL_PAGE, PAGINATION_OFFSET);
    }, [user.username]);

    const _handleClosePopover = () => {
        setAnchorEl(null);
        setComments(null);
    }

    const _renderPosts = () => {
        if (posts == null || posts.length === 0) {
            return <div className={classes.item}><Typography className={classes.textNoPosts} variant="h2">No posts found.</Typography></div>;
        }

        let items = [];
        posts.map((post, index) => 
            items.push(<Post  key={index} user={user} post={post} isPreview={false} openCommentPopoverForPost={_openCommentPopoverForPost} />));
        return items;
    }

    const _openCommentPopoverForPost = (post) => {
        fetchCommentsForPost(post.id, post.username).then((data) => {
            setComments(data);
        });
        setAnchorEl(document);
        setPost(post);
    }

    const _updateComments = (comments) => {
        setComments(comments);
    }

    return (
        <div className={classes.root}>
            {!Boolean(posts) ? <div className={classes.item}><CircularProgress className={classes.loader} /></div> : _renderPosts()}
            {Boolean(anchorEl) ? <CommentPopover user={user} post={post} comments={comments} open={Boolean(anchorEl)} anchorEl={anchorEl}
                handleClosePopover={_handleClosePopover} updateComments={_updateComments} /> : <span />}
        </div>
    );
}

export default FeeedPageContent;