import { DISPLAY_POSTS_LAYOUT, POSTS_PER_PAGE } from '../types';


export function displayScheme(state = {display: 'list', numPostsPerPage: 5}, action){
    switch(action.type){
        case DISPLAY_POSTS_LAYOUT:
            return {...state, display: action.displayLayout};
        case POSTS_PER_PAGE:
            return {...state, numPostsPerPage: action.numberOfPosts};
        default:
            return state;
    }
}