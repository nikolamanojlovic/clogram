import axios from 'axios';
import { API } from '../helpers/constants';
import { userLogInAction, userLogOutAction } from '../actions/userActions';
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