import { DISPLAY_POSTS_LAYOUT } from '../types';


export function displayScheme(state = 'list', action){
    switch(action.type){
        case DISPLAY_POSTS_LAYOUT:
            return action.payload;
        default:
            return state;
    }
}