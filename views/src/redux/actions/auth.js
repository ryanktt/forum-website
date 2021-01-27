import axios from '../../axios';

import {LOGIN, SIGNUP, AUTH_ERROR} from './actionTypes/authTypes';
import {LOADING} from './actionTypes/commonTypes';


export const auth = (formData, type) => async dispatch => {
    dispatch({
        type: LOADING
    })


    let path = '';
    type === 'login' ? path = '/auth/login' : path = '/auth/signup';

    let dispatchType;
    type === 'login' ? dispatchType = LOGIN : dispatchType = SIGNUP;
    // type = 'signup' ? dispatchTypeError = SIGNUP_FAILED : dispatchTypeError = LOGIN_FAILED;

    
    try { 
        const response = await axios.post(path, formData);
       
        return dispatch({
            type: dispatchType,
            payload: response.data
        })

    } catch(err) {
        alert('' + err + '')
        // const errors = err.response.data.errors
        
        // if(errors) {
        //     console.log(errors);
        // } else {
            
        // }

        return dispatch({
            type: AUTH_ERROR
        })
    }
}