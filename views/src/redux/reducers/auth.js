import {LOGIN, SIGNUP, LOGOUT, AUTH_ERROR, LOAD_USER, USER_LOADING, USER_STOP_LOADING} from '../actions/actionTypes/authTypes'
import {LOADING} from '../actions/actionTypes/commonTypes';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: false
}

const auth = (state = initialState, action) => {
    switch(action.type) {
        case USER_LOADING: {
            return {...state, loading: true}
        }
        case USER_STOP_LOADING: {
            return {...state, loading: false}
        }
        case LOAD_USER: 
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
        }
        case LOGIN:
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
            }
        case SIGNUP:
            return {
                ...state
            }
        case AUTH_ERROR:
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null
            }
        default:
            return state   
    }

}

export default auth;