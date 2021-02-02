import axios from '../../utils/axios';

import {LOGIN, SIGNUP, AUTH_ERROR, LOAD_USER, LOGOUT} from './actionTypes/authTypes';
import {LOADING} from './actionTypes/commonTypes';
import {validationAlert as valAlert} from './validationAlert';

export const loadUser = async dispatch => {

    try {
        const user = await axios.get('/user');

        return dispatch({
            type: LOAD_USER,
            payload: user.data
        })
    } catch (err) {
        console.log(err.response);
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const auth = (formData, type) => async dispatch => {
    dispatch({
        type: LOADING
    })


    let path = '';
    type === 'login' ? path = '/auth/login' : path = '/auth/signup';

    let dispatchType;
    type === 'login' ? dispatchType = LOGIN : dispatchType = SIGNUP;
    
    try { 
        const response = await axios.post(path, formData);
    
        dispatch({
            type: dispatchType,
            payload: response.data
        })

        if(type === 'login') { 
            loadUser(dispatch);
            return {type: 'login'}
        }

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.map(error => {
                return dispatch(valAlert(error.msg, 'danger'));
            })
            
        } 
        console.log(err)

        dispatch({
            type: AUTH_ERROR
        });

    }
}

export const logout = dispatch => {
    dispatch({
        type: LOGOUT
    })
}