import { DISPLAY_POSTS_LAYOUT, POSTS_PER_PAGE } from '../types';


export function displayPostsLayout(action){
    return {
        type: DISPLAY_POSTS_LAYOUT,
        payload: action
    }
}

export function postsPerPage(action){
    return {
        type: POSTS_PER_PAGE,
        payload: action
    }
}