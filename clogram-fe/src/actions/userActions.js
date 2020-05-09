export const USER_LOG_IN = 'USER_LOG_IN';
export const USER_LOG_OUT = 'USER_LOG_OUT';
export const FETCH_FRIENDS = 'FETCH_FRIENDS';
export const SET_FRIEND = 'SET_FRIEND';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';

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

export const fetchFriendsAction = (friends) => {
    return {
        type: FETCH_FRIENDS,
        payload: friends
    }
}

export const setFriendAction = (friend) => {
    return {
        type: SET_FRIEND,
        payload: friend
    }
}

export const removeFriendAction = () => {
    return {
        type: REMOVE_FRIEND
    }
}