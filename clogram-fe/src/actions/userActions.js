export const USER_LOG_IN = 'USER_LOG_IN'

export const userLogInAction = (user) => {
    return {
        type: USER_LOG_IN,
        payload: user
    }
}