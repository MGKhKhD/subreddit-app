import { SIGN_UP_NEW_USER } from '../types';
import api from '../apiCalls';

export function signupAction(data){
    return{
        type: SIGN_UP_NEW_USER,
        payload: data
    };
}


export const signupUser = (credentials) => dispatch =>
api.user.signup(credentials).then(response => dispatch(signupAction(response)));