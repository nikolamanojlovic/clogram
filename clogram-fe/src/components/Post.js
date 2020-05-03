import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Card, Typography, CardMedia, CardHeader, Avatar, CardContent, Divider, CardActionArea, CardActions, IconButton } from '@material-ui/core';
import { logIn } from '../services/userService';
import ErrorMessage from './ErrorMessage';
import { clearMessageAction } from '../actions/messageActions';
import moment from "moment";
import { DEFAULT_DATE_TIME_FORMAT } from '../helpers/constants';
import { FavoriteBorderOutlined } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        marginBottom: 15,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        boxShadow: '0px 19px 54px 0px rgba(50,50,50,0.08)'
    },
    header: {
        cursor: 'default',
        textAlign: 'left'
    },
    media: {
        height: 600,
        width: 600,
        objectFit: 'contain'
    },
    mediaPriview: {
        height: 200,
        width: 200
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
    }
});

const Post = (props) => {
    const classes = useStyles();

    const _createImage = () => {
        let post = props.post;

        if (post.photo == null || post.photo_mime_type == null) {
            return;
        }

        let src = "data:" + post.photo_mime_type + ";base64," + Buffer.from(post.photo).toString("base64");
        return <img className={props.isPreview ? classes.mediaPriview : classes.media} src={src} />;
    }

    return (
        <Card className={classes.root} >
            {!props.isPreview ?
                <CardHeader className={classes.header} title={<b>{props.post.username}</b>}
                    subheader={moment(new Date(props.post.post_timestamp)).format(DEFAULT_DATE_TIME_FORMAT).toString()}
                    avatar={<Avatar className={classes.avatar} src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />} />
                : <span />}
            {_createImage()}
            {!props.isPreview ?
                <CardActions className={classes.content} disableSpacing>
                    <IconButton className={classes.iconButton} disableRipple={true}>
                        <FavoriteBorderOutlined className={classes.icon} />
                        <Typography>313123 people like this</Typography>
                    </IconButton>
                </CardActions> : <span />}
            {!props.isPreview ?
                <CardContent className={classes.content}>
                    {props.post.descrip == "" ? <span /> : <Typography><b>{props.post.username}</b> {props.post.descrip}</Typography>}
                </CardContent> : <span />}
        </Card>
    );
}

export default Post;