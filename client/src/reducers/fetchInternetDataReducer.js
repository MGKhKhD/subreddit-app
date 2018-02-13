import { RECEIVE_POSTS, SORT_SUBREDDIT_BY } from '../types';

export function receivePosts(state={}, action={}){
    switch(action.type){
        case RECEIVE_POSTS:
            return action.payload;
        default:
            return state;
    }
}

export function sortPosts(state='new', action){
    switch(action.type){
        case SORT_SUBREDDIT_BY:
            return action.payload;
        default:
            return state;
    }
}