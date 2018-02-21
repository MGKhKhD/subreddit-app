import { combineReducers } from 'redux';
import { todos, todosFromBD, categories } from './todosReducer.js';
import {receivePosts, sortPosts, activeSubreddit} from './fetchInternetDataReducer';
import { authState } from './authReducer';
import { displayScheme } from './display_posts_reducer';
import {bookmarks} from './bookmarksReducer';

export default combineReducers({
    todos,
    receivePosts,
    sortPosts,
    todosFromBD,
    authState,
    categories,
    displayScheme,
    bookmarks,
    activeSubreddit
});