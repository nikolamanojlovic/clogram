import React,{ Fragment } from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { MESSAGES } from "../helpers/messages";

const useStyles = makeStyles({
    error: {
    }
});

const ErrorMessage = () => {
    const classes = useStyles();
    const messageKey = useSelector(state => state.message);

    return (
        <Fragment>
            {messageKey ? <Typography className={classes.error}> {MESSAGES.get(messageKey)} </Typography> : <span />}
        </Fragment>
    );
}

export default ErrorMessage;