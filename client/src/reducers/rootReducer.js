import { combineReducers } from 'redux';
import {todos, todoClick, todosFromBD, activeSubredditModalDisplay} from './todosReducer.js';
import {receivePosts} from './fetchInternetDataReducer';

export default combineReducers({
    todos,
    todoClick,
    receivePosts,
    todosFromBD,
});