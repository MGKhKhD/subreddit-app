import { combineReducers } from 'redux';
import {todos, todoClick, updateSavedFlag} from './todosReducer.js';
import {receivePosts} from './fetchInternetDataReducer';

export default combineReducers({
    todos,
    todoClick,
    receivePosts,
    updateSavedFlag
});