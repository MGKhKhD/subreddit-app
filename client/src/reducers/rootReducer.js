import { combineReducers } from 'redux';
import {todos, todoClick, todosFromBD, activeSubredditModalDisplay} from './todosReducer.js';
import {receivePosts} from './fetchInternetDataReducer';
import { authState } from './authReducer';

export default combineReducers({
    todos,
    todoClick,
    receivePosts,
    todosFromBD,
    authState
});