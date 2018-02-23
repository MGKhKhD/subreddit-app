import { CONTENT_IS_UP_TO_DATE } from '../message_types';

export function message(state=[], action){
    switch(action.type){
        case CONTENT_IS_UP_TO_DATE:
            return [...state, CONTENT_IS_UP_TO_DATE];
        default: return state;
    }
}