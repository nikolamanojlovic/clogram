import axios from 'axios';
import { API } from '../helpers/constants';
import { userLogInAction } from '../actions/userActions';
import { addMessageAction } from '../actions/messageActions';

export const logIn = (username, password) => {
    axios.post(API + 'auth/login', {
        username: username,
        password: password
    }).then((response) => {
        userLogInAction(response.data)
    }).catch((error) => {
        addMessageAction(error.data)
    })
}