import { USER_LOG_IN, USER_LOG_OUT, FETCH_FRIENDS, SET_FRIEND, REMOVE_FRIEND } from "../actions/userActions"

const userReducer = (state = { user: undefined, friends: null }, action) => {
    switch (action.type) {
        case USER_LOG_IN:
            return { ...state, user: action.payload };
        case USER_LOG_OUT:
            return { ...state, user: undefined };
        case FETCH_FRIENDS:
            return { ...state, friends: action.payload };
        case SET_FRIEND:
            return { ...state, friend: action.payload };
        case REMOVE_FRIEND:
            return { ...state, friend: undefined };
        default:
            return state
    }
}

export default userReducer;