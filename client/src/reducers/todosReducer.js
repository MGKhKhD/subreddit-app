import {UPDATE_SAVE_FLAG_OF_TODO, 
    ADD_TODO, 
    INITILAIZE_SETTING_LIST, 
    SHOW_ACTIVE_SUBREDDIT_MODAL, 
    DELETE_TODO_FROM_LIST, 
    SET_FETCHING_TO_UPDATED,
    ADD_CATEGORY} from '../types';

export  function todos(state=[], action){
    switch(action.type){
        case ADD_TODO:
            return [...state, {
                todo: action.payload,
                saved: action.saved
            }];
        case UPDATE_SAVE_FLAG_OF_TODO:
            return state.map(obj => obj.todo === action.payload.subreddit?
            {...obj, saved: true, category: action.payload.category} : obj);
        case DELETE_TODO_FROM_LIST:
            return state.filter(obj => obj.todo !== action.payload);    
        default: 
            return state;
    }
}

export function todosFromBD(state=[], action){
    switch(action.type){
        case INITILAIZE_SETTING_LIST:
            return action.payload;
        default:
            return state;
    }
}

export function categories(state=[], action){
    switch(action.type){
        case ADD_CATEGORY:
            return action.payload;
        default: 
            return state;
    }
}


export function todoClick(state={}, action){
    switch(action.type){
        case "TODO_CLICK":
             return action.payload;
        default: 
            return state;
    }
}

