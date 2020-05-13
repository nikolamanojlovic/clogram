export const FETCH_POSTS = 'FETCH_POSTS'
export const REMOVE_POSTS = 'REMOVE_POSTS'
export const FETCH_POSTS_FOR_USER = 'FETCH_POSTS_FOR_USER'
export const REMOVE_POSTS_FOR_USER = 'REMOVE_POSTS_FOR_USER'

export const fetchPostsAction = (posts) => {
    return {
        type: FETCH_POSTS,
        payload: posts
    }
}

export const removePostsAction = () => {
    return {
        type: REMOVE_POSTS
    }
}

export const fetchPostsForUserAction = (posts) => {
    return {
        type: FETCH_POSTS_FOR_USER,
        payload: posts
    }
}

export const removePostsForUserAction = () => {
    return {
        type: REMOVE_POSTS_FOR_USER
    }
}