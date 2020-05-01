import axios from 'axios';
import { API } from '../helpers/constants';
import { addMessageAction, clearMessageAction } from '../actions/messageActions';
import { fetchPostsAction } from '../actions/postActions';
import { store } from '../store';

export const paginatePosts = (username, page, offset) => {
    store.dispatch(clearMessageAction());

    axios.get(API + 'content/paginatePosts', {
        params: {
            username: username,
            page: page,
            offset: offset
        }
    }).then((response) => {
        store.dispatch(fetchPostsAction(response.data));
    }).catch((error) => {
        store.dispatch(addMessageAction(error.response.data));
    })
}

export const createPost = (username, image, description) => {
    store.dispatch(clearMessageAction());

    axios.post(API + 'content/createPost', {
        username: username,
        image: image,
        description: description
    }).then((response) => {

    }).catch((error) => {
        store.dispatch(addMessageAction(error.response.data));
    })
}