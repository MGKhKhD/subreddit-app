import { combineReducers } from 'redux';
import { todos, todoClick, todosFromBD, categories } from './todosReducer.js';
import {receivePosts} from './fetchInternetDataReducer';
import { authState } from './authReducer';
import { displayScheme } from './display_posts_reducer';

export default combineReducers({
    todos, 
    todoClick,
    receivePosts,
    todosFromBD,
    authState,
    categories,
    displayScheme
});