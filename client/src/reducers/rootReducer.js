import { combineReducers } from 'redux';
import {todos, todoClick} from './todosReducer.js';
import {receivePosts} from './fetchInternetDataReducer';

export default combineReducers({
    todos,
    todoClick,
    receivePosts
});