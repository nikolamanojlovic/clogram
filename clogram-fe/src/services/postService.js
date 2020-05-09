import axios from 'axios';
import { API, PAGINATION_INITAL_PAGE, PAGINATION_OFFSET } from '../helpers/constants';
import { addMessageAction, clearMessageAction } from '../actions/messageActions';
import { fetchPostsAction, fetchPostsForUserAction } from '../actions/postActions';
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

    let data = new FormData();
    data.append('username', username)
    data.append('image', image)
    data.append('description', description)

    axios.post(API + 'content/createPost', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => {
        if (response.status === 200) {
            paginatePosts(username, PAGINATION_INITAL_PAGE, PAGINATION_OFFSET);
        }
    }).catch((error) => {
        store.dispatch(addMessageAction(error.response.data));
    })
}

export const uploadProfilePicture = (username, image) => {
    store.dispatch(clearMessageAction());

    let data = new FormData();
    data.append('username', username)
    data.append('image', image)

    axios.post(API + 'content/uploadProfilePic', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => {
    }).catch((error) => {
        console.log(error);
        store.dispatch(addMessageAction(error.response.data));
    })
}

export const fetchPostsForUser = (username) => {
    store.dispatch(clearMessageAction());

    axios.get(API + 'content/fetchPostsForUser', {
        params: {
            username: username
        }
    }).then((response) => {
        store.dispatch(fetchPostsForUserAction(response.data));
    }).catch((error) => {
        store.dispatch(addMessageAction(error.response.data));
    })
}

export const fetchPostsForFriend = (username) => {
    store.dispatch(clearMessageAction());

    return axios.get(API + 'content/fetchPostsForUser', {
        params: {
            username: username
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        store.dispatch(addMessageAction(error.response.data));
    })
}

export const likePost = (id, username, likedBy) => {
    store.dispatch(clearMessageAction());

    axios.post(API + 'content/likePost', {
        id: id,
        username: username,
        liked_by: likedBy
    }).catch((error) => {
        store.dispatch(addMessageAction(error.response.data));
    })
}

export const dislikePost = (id, username, likedBy) => {
    store.dispatch(clearMessageAction());

    axios.post(API + 'content/dislikePost', {
        id: id,
        username: username,
        liked_by: likedBy
    }).catch((error) => {
        store.dispatch(addMessageAction(error.response.data));
    })
}