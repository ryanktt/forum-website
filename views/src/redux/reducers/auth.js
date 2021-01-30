import {LOGIN, SIGNUP, LOGOUT, AUTH_ERROR, LOAD_USER} from '../actions/actionTypes/authTypes'
import {LOADING} from '../actions/actionTypes/commonTypes';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_USER: 
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
        }
        case LOGIN:
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false
            }
        case SIGNUP:
            return {
                ...state,
                loading: false
            }
        case AUTH_ERROR:
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        case LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state   
    }

}

export default reducer;