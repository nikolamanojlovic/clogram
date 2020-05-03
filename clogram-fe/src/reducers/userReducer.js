import { USER_LOG_IN, USER_LOG_OUT, FETCH_FRIENDS } from "../actions/userActions"

const userReducer = (state = { user: undefined, friends: null }, action) => {
    switch (action.type) {
        case USER_LOG_IN:
            return { ...state, user: action.payload };
        case USER_LOG_OUT:
            return { ...state, user: undefined };
        case FETCH_FRIENDS:
            return { ...state, friends: action.payload };
        default:
            return state
    }
}

export default userReducer;