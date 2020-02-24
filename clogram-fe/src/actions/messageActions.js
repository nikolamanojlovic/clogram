export const ADD_MESSAGE = 'ADD_MESSAGE'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'

export const addMessageAction = (message) => dispatch => {
    dispatch({
        type: ADD_MESSAGE,
        payload: message
    })
}

export const clearMessageAction = () => dispatch => {
    dispatch({
        type: CLEAR_MESSAGE,
    })
}