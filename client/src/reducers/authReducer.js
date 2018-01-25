import { SIGN_UP_NEW_USER } from '../types';

export function signupEmailPassword(state ={}, action ={}){
    switch(action.type){
        case SIGN_UP_NEW_USER:
            return action.payload;
        default: return state;
    }
}