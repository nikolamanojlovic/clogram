import { FETCH_POSTS, FETCH_POSTS_FOR_USER, REMOVE_POSTS, REMOVE_POSTS_FOR_USER } from "../actions/postActions";

const postsReducer = (state = { posts: null, usersPosts: null }, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return { ...state, posts: action.payload };
        case REMOVE_POSTS:
            return { ...state, posts: null };
        case FETCH_POSTS_FOR_USER:
            return { ...state, usersPosts: action.payload };
        case REMOVE_POSTS_FOR_USER:
            return { ...state, usersPosts: null };
        default:
            return state
    }
}

export default postsReducer;