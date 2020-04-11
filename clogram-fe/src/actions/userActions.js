export const USER_LOG_IN = 'USER_LOG_IN';
export const USER_LOG_OUT = 'USER_LOG_OUT';

export const userLogInAction = (user) => {
    return {
        type: USER_LOG_IN,
        payload: user
    }
}

export const userLogOutAction = () => {
    return {
        type: USER_LOG_OUT
    }
}