import { FETCH_POSTS } from "../actions/postActions";

const postsReducer = (state = { posts: null }, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return { ...state, posts: action.payload };
        default:
            return state
    }
}

export default postsReducer;