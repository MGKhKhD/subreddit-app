import { RECEIVE_POSTS } from '../types';

export function receivePosts(state={}, action={}){
    switch(action.type){
        case RECEIVE_POSTS:
            return action.payload;
        default:
            return state;
    }
}