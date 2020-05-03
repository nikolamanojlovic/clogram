import { FETCH_POSTS, FETCH_POSTS_FOR_USER } from "../actions/postActions";

const postsReducer = (state = { posts: null, usersPosts: null }, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return { ...state, posts: action.payload };
        case FETCH_POSTS_FOR_USER:
            return { ...state, usersPosts: action.payload };
        default:
            return state
    }
}

export default postsReducer;