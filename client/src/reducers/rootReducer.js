import { combineReducers } from 'redux';
import { todos, todosFromBD, categories } from './todosReducer.js';
import {receivePosts, activeSort, activeSubreddit, activePosts} from './fetchInternetDataReducer';
import { authState } from './authReducer';
import { displayScheme } from './display_posts_reducer';
import {bookmarks} from './bookmarksReducer';
import { message } from './messagesReducer';

export default combineReducers({
    todos,
    receivePosts,
    todosFromBD,
    authState,
    categories,
    displayScheme,
    bookmarks,
    activeSubreddit,
    message
});

export const getSort = (state) => activeSort(state.receivePosts);
export const getPosts = state => activePosts(state.receivePosts);