import { combineReducers } from 'redux';
import { todos, todoClick, todosFromBD, categories } from './todosReducer.js';
import {receivePosts, sortPosts} from './fetchInternetDataReducer';
import { authState } from './authReducer';
import { displayScheme } from './display_posts_reducer';
import {bookmarks} from './bookmarksReducer';

export default combineReducers({
    todos, 
    todoClick,
    receivePosts,
    sortPosts,
    todosFromBD,
    authState,
    categories,
    displayScheme,
    bookmarks
});