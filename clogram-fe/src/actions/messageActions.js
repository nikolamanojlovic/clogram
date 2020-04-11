export const ADD_MESSAGE = 'ADD_MESSAGE'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'

export const addMessageAction = (message) => {
    return {
        type: ADD_MESSAGE,
        payload: message
    }
}

export const clearMessageAction = () => {
    return {
        type: CLEAR_MESSAGE
    }
}