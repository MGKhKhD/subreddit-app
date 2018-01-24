import api from '../apiCalls';
import {UPDATE_SAVE_FLAG_OF_TODO} from '../types';


let idx = 0;

export function addTodo(text) {
    return {
        type: "ADD_TODO",
        payload: text,
        id: idx++,
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
        payload: subreddit
    };
}

export const saveTodoDB = (subreddit) => dispatch => 
api.fetchFromDB.fetchData(subreddit)
.then(response => {
    if(response.message === 'success'){
        dispatch(updateSavedFlag(subreddit))
    }
});