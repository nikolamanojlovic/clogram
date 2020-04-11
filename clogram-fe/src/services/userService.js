import axios from 'axios';
import { API } from '../helpers/constants';
import { userLogInAction } from '../actions/userActions';
import { addMessageAction, clearMessageAction } from '../actions/messageActions';
import { store } from '../store';

export const logIn = (username, password) => {
    store.dispatch(clearMessageAction());
    
    axios.post(API + 'auth/login', {
        username: username,
        password: password
    }).then((response) => {
        userLogInAction(response.data);
    }).catch((error) => {
        store.dispatch(addMessageAction(error.response.data));
    })
}