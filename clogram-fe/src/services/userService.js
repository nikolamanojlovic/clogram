import axios from 'axios';
import { API, PAGINATION_SEARCH_LIMIT } from '../helpers/constants';
import { userLogInAction, userLogOutAction, fetchFriendsAction } from '../actions/userActions';
import { addMessageAction, clearMessageAction } from '../actions/messageActions';
import { store } from '../store';

export const logIn = (username, password) => {
    store.dispatch(clearMessageAction());
    
    axios.post(API + 'auth/login', {
        username: username,
        password: password
    }).then((response) => {
        store.dispatch(userLogInAction(response.data));
    }).catch((error) => {
        store.dispatch(addMessageAction(error.response.data));
    })
}

export const logOut = () => {
    store.dispatch(userLogOutAction());
}

export const signUp = (username, firstName, lastName, email, password) => {
    store.dispatch(clearMessageAction());
    
    axios.post(API + 'auth/signup', {
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    }).then((response) => {
        store.dispatch(userLogInAction(response.data));
    }).catch((error) => {
        store.dispatch(addMessageAction(error.response.data));
    })
}

export const fetchUser = (username) => {
    store.dispatch(clearMessageAction());

    axios.get(API + 'user', {
        params: {
            username: username
        }
    }).then((response) => {
        
    }).catch((error) => {
        store.dispatch(addMessageAction(error.response.data));
    })
}


export const fetchFriendsForUser = (username) => {
    store.dispatch(clearMessageAction());

    axios.get(API + 'user/friends', {
        params: {
            username: username
        }
    }).then((response) => {
        store.dispatch(fetchFriendsAction(response.data));
    }).catch((error) => {
        store.dispatch(addMessageAction(error.response.data));
    })
}

export const searchUsers = (username) => {
    store.dispatch(clearMessageAction());

    axios.get(API + 'user/search', {
        params: {
            username: username,
            limit: PAGINATION_SEARCH_LIMIT
        }
    }).then((response) => {
        
    }).catch((error) => {
        store.dispatch(addMessageAction(error.response.data));
    })
}