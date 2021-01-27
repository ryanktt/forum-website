import {LOGIN, SIGNUP, LOGOUT, AUTH_ERROR} from '../actions/actionTypes/authTypes'
import {LOADING} from '../actions/actionTypes/commonTypes';

const initialState = {
    token: null,
    isAuthenticated: null,
    user: null,
    loading: false



}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
                loading: false
            }
        case SIGNUP:
            return {
                ...state,
                token: action.payload,
                loading: false
            }
        case AUTH_ERROR:
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
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