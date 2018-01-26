import { SIGN_UP_NEW_USER, LOGIN_USER, LOGOUT_USER } from '../types';

export function signupEmailPassword(state ={}, action ={}){
    switch(action.type){
        case SIGN_UP_NEW_USER:
            return action.payload;
        default: return state;
    }
}

export function loginEmailPassword(state ={}, action ={}){
    switch(action.type){
        case LOGIN_USER:
            return action.payload;
        default: return state;
    }
}

export function logout(state ={}, action ={}){
    switch(action.type){
        case LOGOUT_USER:
            return {};
        default: return state;
    }
}