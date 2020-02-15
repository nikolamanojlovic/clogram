import axios from 'axios';
import { API } from '../helpers/constants';
import { userLogInAction } from '../actions/userActions';

export const logIn = (username, password) => {
    console.log(username, password)
    axios.post(API + 'auth/login', {
        username: username,
        password: password
    })
        .then((response) => {
            userLogInAction(response.data)
        })
}