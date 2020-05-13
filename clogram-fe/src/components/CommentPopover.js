import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Popover, CircularProgress } from '@material-ui/core';
import { TextField } from "@material-ui/core";
import { SendOutlined, ClearOutlined } from '@material-ui/icons';
import { commentPost, removeComment } from '../services/postService';
import moment from 'moment';
import { DEFAULT_DATE_TIME_FORMAT } from '../helpers/constants';

const useStyles = makeStyles({
    paper: {
        width: '500px',
        height: '500px',
        padding: 10,
        boxShadow: '0px 19px 54px 0px rgba(50,50,50,0.1)',
        overflow: 'none'
    },
    comments: {
        minWidth: '100%',
        minHeight: '80%',
        maxHeight: '90%',
        overflowY: 'scroll'
    },
    commentDiv: {
        maxWidth: '100%',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 10px 54px 0px rgba(50,50,50,0.1)',
        marginBottom: 10
    },
    commentDivUser: {
        maxWidth: '100%',
        backgroundColor: '#4CA2CD',
        boxShadow: '0px 10px 54px 0px rgba(50,50,50,0.1)',
        marginBottom: 10
    },
    clearButton: {
        '&:hover': {
            backgroundColor: 'transparent'
        },
        display: 'inline-block',
        padding: 0,
        marginLeft: 10
    },
    clearSvg: {
        textAlign: 'right',
        color: '#FFFFFF'
    },
    commentFriend: {
        paddingLeft: 5,
        paddingTop: 5,
        overflowWrap: 'break-word',
        width: '100%',
        display: 'inline-block',
        backgroundColor: '#FFFFFF',
        cursor: 'default'
    },
    commentUser: {
        paddingLeft: 5,
        paddingTop: 5,
        display: 'inline-block',
        overflowWrap: 'break-word',
        width: '90%',
        color: '#FFFFFF',
        cursor: 'default'
    },
    addComment: {
        display: 'inline-block',
        maxWidth: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(50,50,50,0.08)',
        zIndex: 1
    },
    addCommentIcon: {
        display: 'inline-block',
        position: 'absolute',
        bottom: 2,
        right: 5,
        zIndex: 1
    },
    noComments: {
        textAlign: 'center',
        cursor: 'default'
    },
    progress: {
        margin: 'auto'
    },
    timestamp: {
        paddingLeft: 5,
        paddingBottom: 5,
        fontStyle: 'italic'
    },
    timestampUser: {
        color: '#FFFFFF',
        paddingLeft: 5,
        paddingBottom: 5,
        fontStyle: 'italic'
    }
});

const CommentPopover = (props) => {
    const classes = useStyles();

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(props.comments); // fore update of child

    useEffect(() => {
        setComments(props.comments);
    }, [props.comments]);

    const _removeComment = (e, ord) => {
        e.preventDefault();
        removeComment(props.post.id, props.post.username, ord).then((data) => {
            props.updateComments(data);
        });
        setComment("");
    }

    const _renderComments = () => {
        let coms = [];
        props.comments.map((e, i) => {
            coms.push(<div className={e.posted_by === props.user.username ?  classes.commentDivUser : classes.commentDiv} key={i}>
                <Typography className={e.posted_by === props.user.username ? classes.commentUser : classes.commentFriend} key={i}>
                    <b>{e.posted_by}:</b> {e.comment_text}
                </Typography>
                {e.posted_by === props.user.username ?
                    <IconButton className={classes.clearButton} disableRipple={true} key={i} onClick={(ev) => _removeComment(ev, e.ord)}>
                        <ClearOutlined key={e.ord} className={classes.clearSvg} /></IconButton>
                    : <span />}
                    <Typography className={e.posted_by === props.user.username ? classes.timestampUser : classes.timestamp} variant="caption">{moment(new Date(e.comment_timestamp)).format(DEFAULT_DATE_TIME_FORMAT).toString()}</Typography>
            </div>);
        });
        return coms;
    }

    const _submitComment = (e) => {
        e.preventDefault();
        commentPost(props.post.id, props.post.username, comment, props.user.username).then((data) => {
            props.updateComments(data);
        });
        setComment("");
    }

    return (
        <Popover open={props.open} anchorEl={props.anchorEl} onClose={props.handleClosePopover} anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
        }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }} PaperProps={{ className: classes.paper }}>
            <div className={classes.comments}>
                {!Boolean(props.comments) ? <CircularProgress className={classes.progress}/> : (props.comments.length === 0 ? <Typography className={classes.noComments}>There are no comments for this post.</Typography> : _renderComments())}
            </div>
            <TextField className={classes.addComment} value={comment} placeholder="Add comment" variant="filled" onChange={(e) => setComment(e.target.value)} fullWidth />
            <IconButton className={classes.addCommentIcon} disableRipple={true} onClick={(e) => _submitComment(e)}>
                <SendOutlined />
            </IconButton>
        </Popover>
    );
}

export default CommentPopover;