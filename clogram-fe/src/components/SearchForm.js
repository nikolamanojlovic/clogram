import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { searchUsers } from '../services/userService';
import { store } from '../store';
import { setFriendAction } from '../actions/userActions';
import { changePageAction } from '../actions/pageActions';
import { FRIEND_PROFILE_PAGE } from '../helpers/constants';

const useStyles = makeStyles({
    formControl: {
        margin: '0 auto',
        minWidth: 200,
        alignItems: 'center'
    },
    textField: {
    },
    paper: {
        boxShadow: '0px 19px 54px 0px rgba(50,50,50,0.08)'
    },
    option: {
        margin: 2,
        textAlign: 'center'
    },
    button: {
        color: '#000000',
        fontWeight: 'normal',
        background: 'transparent',
        textTransform: 'none',
        margin: 'auto',
        '&:hover': {
            backgroundColor: 'transparent'
        }
    }
});

const SearchForm = (props) => {
    const classes = useStyles();

    const [suggestions, setSuggestions] = useState([]);
    const [input, setInput] = useState("");

    const _search = (text) => {
        setInput(text);
        searchUsers(text, props.user.username).then(function (data) {
            setSuggestions(data);
        });
    }

    const _openFriendProfile = (username) => {
        store.dispatch(setFriendAction(username));
        store.dispatch(changePageAction(FRIEND_PROFILE_PAGE));
        setSuggestions([]);
        setInput("");
    }

    return (
        <Autocomplete className={classes.formControl} size="small"
            classes={{
                paper: classes.paper,
                option: classes.option
            }}
            noOptionsText="No users found."
            inputValue={input}
            disableClearable={true}
            onChange={(e, value) => _openFriendProfile(value)}
            options={suggestions}
            renderInput={(params) => (
                <TextField {...params} variant="standard" placeholder="Search" onChange={e => _search(e.target.value)} />
            )}>
        </Autocomplete>
    );
}

export default SearchForm;