import { SIGN_UP_NEW_USER, 
    LOGIN_USER, 
    LOGOUT_USER } from '../types';

import api from '../apiCalls';

export function signupAction(user){
    return{
        type: SIGN_UP_NEW_USER,
        payload: user
    };
}


export const signupUser = (user) => dispatch =>
api.user.signup(user).then(response => dispatch(signupAction(response)));


export function loginAction(user){
    return{
        type: LOGIN_USER,
        payload: user
    };
}


export const login = (credentials) => dispatch =>
api.user.login(credentials).then(user => {
    localStorage.subredditToken = user.token;
    dispatch(loginAction(user));
});

export function logoutAction(){
    return{
        type: LOGOUT_USER
    };
}

export const logout = () => dispatch =>{
    localStorage.removeItem('subredditToken');
    dispatch(logoutAction());
}