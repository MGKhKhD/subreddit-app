import { SIGN_UP_NEW_USER, LOGIN_USER, LOGOUT_USER } from '../types';

export function authState(state ={}, action ={}){
    switch(action.type){
        case SIGN_UP_NEW_USER:
            return action.user;
        case LOGIN_USER:
            return action.user;
        case LOGOUT_USER:
            return {};
        default: return state;
    }
}

