import axios from '../../axios';

import {LOGIN, SIGNUP, AUTH_ERROR} from './actionTypes/authTypes';


export const auth = (formData, type) => async dispatch => {
    let path = '';
    type === 'login' ? path = '/auth/login' : path = '/auth/signup';

    let dispatchType;
    type === 'login' ? dispatchType = LOGIN : dispatchType = SIGNUP;
    // type = 'signup' ? dispatchTypeError = SIGNUP_FAILED : dispatchTypeError = LOGIN_FAILED;

    
    try { 
        const response = await axios.post(path, formData);
        dispatch({
            type: dispatchType,
            payload: response.data
        })
        

    } catch(err) {
        const errors = err.response.data.errors;
        if(errors) {
            console.log(errors)
        }
        
        dispatch({
            type: AUTH_ERROR
        })
    }
}