import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Card, Typography, CardMedia, CardHeader, Avatar, CardContent, Divider, CardActionArea, CardActions, IconButton } from '@material-ui/core';
import { logIn } from '../services/userService';
import ErrorMessage from './ErrorMessage';
import { clearMessageAction } from '../actions/messageActions';
import moment from "moment";
import { DEFAULT_DATE_TIME_FORMAT } from '../helpers/constants';
import { FavoriteBorderOutlined, FavoriteRounded, ChatBubbleOutline } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        marginBottom: 15,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        boxShadow: '0px 19px 54px 0px rgba(50,50,50,0.08)'
    },
    rootPreview: {
        display: 'inline',
        margin: 10
    },
    header: {
        cursor: 'default',
        textAlign: 'left'
    },
    media: {
        height: 650,
        width: 650,
        padding: 0,
        objectFit: 'scale-down'
    },
    mediaPriview: {
        height: 300,
        width: 300,
        objectFit: 'contain'
    },
    content: {
        textAlign: 'left',
        padding: 0,
        margin: 0
    },
    iconButton: {
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 0,
        padding: 0,
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    icon: {
        padding: 0,
        marginRight: 10,
        color: '#000000'
    },
    iconActive: {
        padding: 0,
        marginRight: 10,
        color: '#4ca2cd'
    },
    likeText: {
        marginTop: 9
    },
    comments: {
        display: 'block',
        textAlign: 'center'
    },
    divider: {
        marginTop: 5,
        marginBottom: 5
    }
});

const Post = (props) => {
    const classes = useStyles();
    let isLikedByUser = false;

    const _renderImage = () => {
        let post = props.post;

        if (post.photo == null || post.photo_mime_type == null) {
            return;
        }

        let src = "data:" + post.photo_mime_type + ";base64," + Buffer.from(post.photo).toString("base64");
        return <img key={props.key} className={props.isPreview ? classes.mediaPriview : classes.media} src={src} />;
    }

    const _renderLikes = () => {
        let numOfLikes = props.post.num_of_likes;

        if (numOfLikes > 0) {
            if (isLikedByUser) {
                return numOfLikes > 1 ?
                    <Typography className={classes.likeText} variant="caption" gutterBottom>You and {numOfLikes - 1} people like this.</Typography> :
                    <Typography className={classes.likeText} variant="caption" gutterBottom>You like this.</Typography>
            } else {
                return <Typography className={classes.likeText} variant="caption">{numOfLikes} people like this.</Typography>
            }
        }
        return <Typography className={classes.likeText} variant="caption" gutterBottom>Be the first to like this post!</Typography>
    }

    const _renderComments = () => {
        let numOfComments = props.post.num_of_comments;

        if (numOfComments == 1) {
            return <Typography className={classes.comments} variant="caption">This post has {props.post.num_of_comments} comment.</Typography>
        } else if (numOfComments > 1) {
            return <Typography className={classes.comments} variant="caption">This post has {props.post.num_of_comments} comments.</Typography>
        }
    }

    const _likePost = () => {
        isLikedByUser = !isLikedByUser;
    }

    return (
        <Card key={props.key} className={!props.isPreview ? classes.root : classes.rootPreview}>
            {!props.isPreview ?
                <CardHeader className={classes.header} title={<b>{props.post.username}</b>}
                    subheader={moment(new Date(props.post.post_timestamp)).format(DEFAULT_DATE_TIME_FORMAT).toString()}
                    avatar={<Avatar className={classes.avatar} src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />} />
                : <span />}
            {!props.isPreview ? <Divider className={classes.divider} /> : <span />}
            {_renderImage()}
            {!props.isPreview ? <Divider className={classes.divider} /> : <span />}
            {!props.isPreview ?
                <CardActions className={classes.content} disableSpacing>
                    <IconButton className={classes.iconButton} disableRipple={true}>
                        {isLikedByUser ? <FavoriteRounded className={classes.iconActive} onClick={() => _likePost()} /> : <FavoriteBorderOutlined className={classes.icon} onClick={() => _likePost()} />}
                    </IconButton>
                    <IconButton className={classes.iconButton} disableRipple={true}>
                        <ChatBubbleOutline className={classes.icon}/>
                    </IconButton>
                    {_renderLikes()}
                </CardActions> : <span />}
            {!props.isPreview ?
                <CardContent className={classes.content}>
                    {props.post.descrip == "" ? <span /> : <Typography><b>{props.post.username}</b> {props.post.descrip}</Typography>}
                    {_renderComments()}
                </CardContent> : <span />}
        </Card>
    );
}

export default Post;