import api from '../apiCalls';
import {UPDATE_SAVE_FLAG_OF_TODO, 
    INITILAIZE_SETTING_LIST, ADD_TODO,
    SHOW_ACTIVE_SUBREDDIT_MODAL,
    DELETE_TODO_FROM_LIST, 
    SET_FETCHING_TO_UPDATED } from '../types';
import setTokenHeader from '../utils/setTokenHeader';

export function deleteTodoFromList(text) {
    return {
        type: DELETE_TODO_FROM_LIST,
        payload: text
    };
}    

export function addTodo(text) {
    return {
        type: ADD_TODO,
        payload: text,
        saved: false
    };
}

export const checkIfSubredditExist = (subreddit) => dispatch => 
api.fetchFromInternet.fetchData(subreddit)
.then(jsonData => { 
    if(jsonData){
        dispatch(addTodo(subreddit))
    }
});

export function todoClick(todo){
    return {
        type: "TODO_CLICK",
        payload: todo
    };
}

export function updateSavedFlag(subreddit){
    return {
        type: UPDATE_SAVE_FLAG_OF_TODO,
        payload: subreddit.todo
    };
}

export const saveTodoDB = (subreddit) => dispatch => 
api.postToDB.postData(subreddit)
.then(response => {
    if(response.data){
        dispatch(updateSavedFlag(subreddit))
    }
});

export function settingListInitialized(subreddits){
    return {
        type: INITILAIZE_SETTING_LIST,
        payload: subreddits
    }
}


export const initializeSettingList = () => dispatch => 
api.fetchFromDB.fetchData()
.then(response => {
    if(response.data.documents){
        dispatch(settingListInitialized(response.data.documents))
    }
});

export const deleteTodoFromDB = (subreddit) => dispatch => 
api.deleteFromDB.deleteData(subreddit)
.then(response => {
    if(response.data.documents){
        dispatch(settingListInitialized(response.data.documents))
    }
});