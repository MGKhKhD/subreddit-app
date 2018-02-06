import api from '../apiCalls';
import {UPDATE_SAVE_FLAG_OF_TODO, 
    INITILAIZE_SETTING_LIST, ADD_TODO,
    SHOW_ACTIVE_SUBREDDIT_MODAL,
    DELETE_TODO_FROM_LIST, 
    SET_FETCHING_TO_UPDATED, ADD_CATEGORY } from '../types';
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
        category: 'untitled',
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

export function updateSavedFlag(response){
    return {
        type: UPDATE_SAVE_FLAG_OF_TODO,
        payload: response
    };
}

export const saveTodoDB = (subreddit, category) => dispatch => 
api.postToDB.postData({subreddit: subreddit, category: category})
.then(response => {
    if(response.data){
        dispatch(updateSavedFlag(response.data));
        console.log(response.data);
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

export function categoryAdded(response){
    return {
        type: ADD_CATEGORY,
        playload: response
    }
}

export const addCategory = category => dispatch =>
api.categoryAPI.addCategory(category)
.then(response =>dispatch(categoryAdded(response.data)));