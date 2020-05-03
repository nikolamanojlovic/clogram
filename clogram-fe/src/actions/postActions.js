export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POSTS_FOR_USER = 'FETCH_POSTS_FOR_USER'

export const fetchPostsAction = (posts) => {
    return {
        type: FETCH_POSTS,
        payload: posts
    }
}

export const fetchPostsForUserAction = (posts) => {
    return {
        type: FETCH_POSTS_FOR_USER,
        payload: posts
    }
}