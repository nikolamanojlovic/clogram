import { combineReducers } from 'redux';
import userReducer from './userReducer';
import messageReducer from './messageReducer';
import pageReducer from './pageReducer';

export default combineReducers({
    userReducer,
    messageReducer,
    pageReducer
});