import { SIGN_UP_NEW_USER, 
    LOGIN_USER, 
    LOGOUT_USER } from '../types';

import api from '../apiCalls';
import setTokenHeader from '../utils/setTokenHeader';
import {createSyncAction} from './actionCreators';

export const signupAction = createSyncAction(SIGN_UP_NEW_USER, 'user');
export const loginAction = createSyncAction(LOGIN_USER, 'user');

export function logoutAction(){
    return{
        type: LOGOUT_USER
    };
}

export const signupUser = (user) => dispatch =>
api.user.signup(user).then(response => dispatch(signupAction(response)));


export const login = (credentials) => dispatch =>
api.user.login(credentials).then(user => {
    localStorage.subredditToken = user.token;
    setTokenHeader(localStorage.subredditToken);
    dispatch(loginAction(user));
});

export const logout = () => dispatch =>{
    localStorage.removeItem('subredditToken');
    setTokenHeader();
    dispatch(logoutAction());
}

export const confirmEmail = token => dispatch =>
api.user.confirmation(token).then(user => {
    localStorage.subredditToken = user.token;
    dispatch(loginAction(user));
});