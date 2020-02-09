export const USER_LOG_IN = 'USER_LOG_IN'

export const userLogInAction = (user) => dispatch => {
    dispatch({
        type: USER_LOG_IN,
        payload: user
    })
}