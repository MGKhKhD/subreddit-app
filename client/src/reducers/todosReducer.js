import {UPDATE_SAVE_FLAG_OF_TODO, 
    ADD_TODO_TO_LIST, 
    INITILAIZE_SETTING_LIST, 
    SHOW_ACTIVE_SUBREDDIT_MODAL, 
    DELETE_TODO_FROM_LIST, 
    SET_FETCHING_TO_UPDATED,
    ADD_CATEGORY, PERSIST_CATEGORY_LIST} from '../types';

export  function todos(state=[], action){
    switch(action.type){
        case ADD_TODO_TO_LIST:
            return [...state, {
                todo: action.text,
                saved: false,
                category:'untitled',
                post: action.post
            }];
        case UPDATE_SAVE_FLAG_OF_TODO:
            return state.map(obj => obj.todo === action.response.subreddit?
            {...obj, saved: true, category: action.response.category} : obj);
        case DELETE_TODO_FROM_LIST:
            return state.filter(obj => obj.todo !== action.text);    
        default: 
            return state;
    }
}

export function todosFromBD(state=[], action){
    switch(action.type){
        case INITILAIZE_SETTING_LIST:
            return action.subreddits;
        default:
            return state;
    }
}

export function categories(state=[], action){
    switch(action.type){
        case ADD_CATEGORY:
            return action.categories;
        case PERSIST_CATEGORY_LIST:
            return action.categories;
        default: 
            return state;
    }
}


