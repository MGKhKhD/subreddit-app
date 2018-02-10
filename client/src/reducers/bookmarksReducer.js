
import {FETCH_BOOKMARKS} from '../types';

export function bookmarks(state=[], action){
    switch(action.type){
        case FETCH_BOOKMARKS:
            return action.bookmarks;
        default: return state;
    }
}
