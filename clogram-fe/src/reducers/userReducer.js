import { USER_LOG_IN } from "../actions/userActions"

const userReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case USER_LOG_IN:
            return {...state, user: action.payload}
        default:
            return state
    }
}

export default userReducer;