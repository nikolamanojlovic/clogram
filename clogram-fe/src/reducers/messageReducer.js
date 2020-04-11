import { ADD_MESSAGE, CLEAR_MESSAGE } from "../actions/messageActions"

const messageReducer = (state = {message : undefined}, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return { ...state, message: action.payload }
        case CLEAR_MESSAGE:
            return { ...state, message: undefined }
        default:
            return state
    }
}

export default messageReducer;