import { USER_LOG_IN, USER_LOG_OUT } from "../actions/userActions"

const userReducer = (state = { user: undefined }, action) => {
    switch (action.type) {
        case USER_LOG_IN:
            return { ...state, user: action.payload };
        case USER_LOG_OUT:
            return { ...state, user: undefined };
        default:
            return state
    }
}

export default userReducer;