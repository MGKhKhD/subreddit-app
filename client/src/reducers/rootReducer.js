import { combineReducers } from 'redux';
import { todos, todosFromBD, categories } from './todosReducer.js';
import {posts, activeSort, activePosts} from './fetchInternetDataReducer';
import { authState } from './authReducer';
import { displayScheme } from './display_posts_reducer';
import {bookmarks} from './bookmarksReducer';
import { message } from './messagesReducer';

export default combineReducers({
    todos,
    posts,
    todosFromBD,
    authState,
    categories,
    displayScheme,
    bookmarks,
    message
});

export const getSort = state => activeSort(state.posts);
export const getPosts = state => activePosts(state.posts);