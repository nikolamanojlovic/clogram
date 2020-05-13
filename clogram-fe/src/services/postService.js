import axios from 'axios';
import { API, PAGINATION_INITAL_PAGE, PAGINATION_OFFSET, PROFILE_PAGE } from '../helpers/constants';
import { addMessageAction, clearMessageAction } from '../actions/messageActions';
import { fetchPostsAction, fetchPostsForUserAction } from '../actions/postActions';
import { store } from '../store';
import { fetchUser } from './userService';
import { userLogInAction } from '../actions/userActions';

// POSTS
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
        store.dispatch(addMessageAction(error.data));
    })
}

export const createPost = (username, image, description, currentPage) => {
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
        if (currentPage === PROFILE_PAGE) {
            fetchPostsForUser(username);
        } else {
            paginatePosts(username, PAGINATION_INITAL_PAGE, PAGINATION_OFFSET);
        }
    }).catch((error) => {
        store.dispatch(addMessageAction(error.data));
    })
}

// PROFILE
export const uploadProfilePicture = (username, image) => {
    store.dispatch(clearMessageAction());

    let multipart = new FormData();
    multipart.append('username', username)
    multipart.append('image', image)

    axios.post(API + 'content/uploadProfilePicture', multipart, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => {
        fetchUser(username).then((user) => {
            store.dispatch(userLogInAction(user));
        })
    }).catch((error) => {
        store.dispatch(addMessageAction(error.data));
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
        store.dispatch(addMessageAction(error.data));
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
        store.dispatch(addMessageAction(error.data));
    })
}

// LIKES
export const likePost = (id, username, likedBy) => {
    store.dispatch(clearMessageAction());

    axios.post(API + 'content/likePost', {
        id: id,
        username: username,
        liked_by: likedBy
    }).catch((error) => {
        store.dispatch(addMessageAction(error.data));
    })
}

export const dislikePost = (id, username, likedBy) => {
    store.dispatch(clearMessageAction());

    axios.post(API + 'content/dislikePost', {
        id: id,
        username: username,
        liked_by: likedBy
    }).catch((error) => {
        store.dispatch(addMessageAction(error.data));
    })
}

// COMMENTS
export const fetchCommentsForPost = (postId, username) => {
    store.dispatch(clearMessageAction());

    return axios.get(API + 'content/comments', {
        params: {
            post_id: postId,
            username: username
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        store.dispatch(addMessageAction(error.data));
    })
}

export const commentPost = (postId, username, comment, postedBy) => {
    store.dispatch(clearMessageAction());

    return axios.post(API + 'content/addComment', {
        post_id: postId,
        username: username,
        comment: comment,
        posted_by: postedBy
    }).then((response) => {
        return fetchCommentsForPost(postId, username);
    }).catch((error) => {
        store.dispatch(addMessageAction(error.data));
    })
}

export const removeComment = (postId, username, ord) => {
    store.dispatch(clearMessageAction());

    return axios.post(API + 'content/removeComment', {
        post_id: postId,
        username: username,
        ord: ord
    }).then((response) => {
        return fetchCommentsForPost(postId, username);
    }).catch((error) => {
        store.dispatch(addMessageAction(error.data));
    })
}