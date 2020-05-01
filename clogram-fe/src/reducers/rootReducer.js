import { combineReducers } from 'redux';
import userReducer from './userReducer';
import messageReducer from './messageReducer';
import pageReducer from './pageReducer';
import postsReducer from './postsReducer';

export default combineReducers({
    userReducer,
    messageReducer,
    pageReducer,
    postsReducer
});