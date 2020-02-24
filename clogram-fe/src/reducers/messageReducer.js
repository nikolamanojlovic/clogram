import { ADD_MESSAGE, CLEAR_MESSAGE } from "../actions/messageActions"

const messageReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return { ...state, message: action.payload }
        case CLEAR_MESSAGE:
            return { ...state, message: null }
        default:
            return state
    }
}

export default messageReducer;