import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Card, Typography, CardMedia, CardHeader, Avatar, CardContent, Divider, CardActionArea, CardActions, IconButton, Popover } from '@material-ui/core';
import { logIn } from '../services/userService';
import ErrorMessage from './ErrorMessage';
import { clearMessageAction } from '../actions/messageActions';
import moment from "moment";
import { DEFAULT_DATE_TIME_FORMAT } from '../helpers/constants';
import { FavoriteBorderOutlined, FavoriteRounded, ChatBubbleOutline } from '@material-ui/icons';
import { likePost, dislikePost } from '../services/postService';
import CommentPopover from './CommentPopover';

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
        margin: 10,
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
        marginBottom: 15,
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
    },
    commentPopover: {
        width: '50%',
        height: '50%'
    }
});

const _renderProfilePhoto = (photo) => {

    if (photo == null) {
        return;
    }
    return "data:image/jpeg;base64," + Buffer.from(photo).toString("base64");
}

const Post = (props) => {
    const classes = useStyles();

    const [isLikedByUser, setIsLikedByUser] = useState(props.post.liked_by != null && props.post.liked_by.includes(props.user.username));
    const [anchorEl, setAnchorEl] = useState(null);

    const _renderImage = () => {
        let post = props.post;

        if (post.photo == null || post.photo_mime_type == null) {
            return;
        }

        let src = "data:" + post.photo_mime_type + ";base64," + Buffer.from(post.photo).toString("base64");
        return <img key={props.key} className={props.isPreview ? classes.mediaPriview : classes.media} src={src} />;
    }

    const _renderLikeButton = () => {
        return isLikedByUser ? <FavoriteRounded className={classes.iconActive} onClick={() => _dislikePost()} />
            : <FavoriteBorderOutlined className={classes.icon} onClick={() => _likePost()} />
    }

    const _renderLikes = () => {
        let numOfLikes = props.post.num_of_likes;

        if (numOfLikes > 0) {
            if (isLikedByUser) {
                return numOfLikes > 1 ?
                    <Typography className={classes.likeText} variant="caption" gutterBottom>You and {numOfLikes - 1} people like this.</Typography> :
                    <Typography className={classes.likeText} variant="caption" gutterBottom>You like this.</Typography>
            } else {
                return <Typography className={classes.likeText} variant="caption">{numOfLikes} person likes this.</Typography>
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

    const _handleOpenCommentPopover = (e) => {
        e.preventDefault();
        setAnchorEl(e.currentTarget.parentElement.parentElement);
    }

    const _handleClosePopover = () => {
        setAnchorEl(null);
    }

    const _likePost = () => {
        let post = props.post;
        let user = props.user;

        likePost(post.id, post.username, user.username);
        setIsLikedByUser(true);
        props.post.num_of_likes = props.post.num_of_likes + 1;
    }

    const _dislikePost = () => {
        let post = props.post;
        let user = props.user;

        dislikePost(post.id, post.username, user.username);
        setIsLikedByUser(false);
        props.post.num_of_likes = props.post.num_of_likes - 1;
    }

    return (
        <Fragment>
            <Card key={props.key} className={!props.isPreview ? classes.root : classes.rootPreview}>
                {!props.isPreview ?
                    <CardHeader className={classes.header} title={<b>{props.post.username}</b>}
                        subheader={moment(new Date(props.post.post_timestamp)).format(DEFAULT_DATE_TIME_FORMAT).toString()}
                        avatar={<Avatar className={classes.avatar} src={_renderProfilePhoto(props.post.profile_photo)} />} />
                    : <span />}
                {!props.isPreview ? <Divider className={classes.divider} /> : <span />}
                {_renderImage()}
                {!props.isPreview ? <Divider className={classes.divider} /> : <span />}
                {!props.isPreview ?
                    <CardActions className={classes.content} disableSpacing>
                        <IconButton className={classes.iconButton} disableRipple={true}>
                            {_renderLikeButton()}
                        </IconButton>
                        <IconButton className={classes.iconButton} disableRipple={true} onClick={(e) => _handleOpenCommentPopover(e)}>
                            <ChatBubbleOutline className={classes.icon} />
                        </IconButton>
                        {_renderLikes()}
                    </CardActions> : <span />}
                {!props.isPreview ?
                    <CardContent className={classes.content}>
                        {props.post.descrip == "" ? <span /> : <Typography><b>{props.post.username}</b> {props.post.descrip}</Typography>}
                        {_renderComments()}
                    </CardContent> : <span />}
            </Card>
            <CommentPopover open={Boolean(anchorEl)} anchorEl={anchorEl} handleClosePopover={_handleClosePopover}/>
        </Fragment>
    );
}

export default Post;