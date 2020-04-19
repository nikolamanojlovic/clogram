import axios from 'axios';
import { API } from '../helpers/constants';
import { addMessageAction, clearMessageAction } from '../actions/messageActions';
import { store } from '../store';

export const createPost = (username, image, description) => {
    store.dispatch(clearMessageAction());

    console.log(image)

    axios.post(API + 'content/createPost', {
        username: username,
        image: image,
        description: description
    }).then((response) => {
        
    }).catch((error) => {
        store.dispatch(addMessageAction(error.response.data));
    })
}