import { DISPLAY_POSTS_LAYOUT } from '../types';


export function displayPostsLayout(action){
    return {
        type: DISPLAY_POSTS_LAYOUT,
        payload: action
    }
}