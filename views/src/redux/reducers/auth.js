import {LOGIN, SIGNUP, LOGOUT, AUTH_ERROR, LOAD_USER, USER_LOADING} from '../actions/actionTypes/authTypes';

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
        case LOAD_USER: 
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loading: false
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
                user: null,
                loading: false
            }
        default:
            return state   
    }

}

export default auth;