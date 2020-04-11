import React, { Fragment } from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { MESSAGES } from "../helpers/messages";

const useStyles = makeStyles({
    error: {
        width: "60%",
        margin: "auto"
    }
});

const ErrorMessage = () => {
    const classes = useStyles();
    const messageKey = useSelector(state => state.messageReducer.message);

    return (
        <Fragment>
            {messageKey ? <Alert className={classes.error} severity="error">{MESSAGES.get(messageKey)}</Alert> : <span />}
        </Fragment>
    );
}

export default ErrorMessage;