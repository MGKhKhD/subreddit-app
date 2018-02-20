import api from '../apiCalls';
import {UPDATE_SAVE_FLAG_OF_TODO, 
    INITILAIZE_SETTING_LIST, ADD_TODO_TO_LIST,
    SHOW_ACTIVE_SUBREDDIT_MODAL,
    DELETE_TODO_FROM_LIST, 
    SET_FETCHING_TO_UPDATED, ADD_CATEGORY, PERSIST_CATEGORY_LIST } from '../types';
import setTokenHeader from '../utils/setTokenHeader';
import {createSyncAction} from './actionCreators';
import _ from 'lodash';

export const deleteTodoFromList = createSyncAction(DELETE_TODO_FROM_LIST, 'text');
export const addTodo = createSyncAction(ADD_TODO_TO_LIST, 'text', 'post');   
export const updateSavedFlag = createSyncAction(UPDATE_SAVE_FLAG_OF_TODO, 'response');

export const settingListInitialized = createSyncAction(INITILAIZE_SETTING_LIST, 'subreddits');

export const persisCategoryList = createSyncAction(PERSIST_CATEGORY_LIST, 'categories');
export const categoryAdded = createSyncAction(ADD_CATEGORY, 'categories');


export const checkIfSubredditExist = (subreddit) => dispatch => 
api.fetchFromInternet.fetchData(subreddit)
.then(jsonData => {
    let mappedData = jsonData.data.children.map(child => child.data);
    const samplePost = _.sample(mappedData); 
    if(jsonData){
        dispatch(addTodo(subreddit, samplePost))
    }
});


export const saveTodoDB = (subreddit, category) => dispatch => 
api.subredditAPI.postData({subreddit: subreddit, category: category})
.then(response => {
    if(response.data){
        dispatch(updateSavedFlag(response.data));
    }
});


export const initializeSettingList = () => dispatch => 
api.subredditAPI.fetchData()
.then(response => {
    if(response.data.documents){
        dispatch(settingListInitialized(response.data.documents))
    }
});

export const deleteTodoFromDB = (subredditId) => dispatch => 
api.subredditAPI.deleteData(subredditId)
.then(response => {
    if(response.data.documents){
        dispatch(settingListInitialized(response.data.documents))
    }
});



export const addCategory = category => dispatch =>
api.categoryAPI.addCategory(category)
.then(response =>{
    dispatch(categoryAdded(response.data.documents));
});




export const fetchCategories = () => dispatch =>
api.categoryAPI.fetchCategories()
.then(response =>{
    dispatch(persisCategoryList(response.data.documents));
});