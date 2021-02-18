import {SET_QUOTE, QUOTED } from '../actions/actionTypes/postTypes.js';

const initialState = {
    quote: ''
}

const thread = (state = initialState, action) => {
    const { type, payload} = action;
    switch(type) {
        
        case SET_QUOTE: {
            return {...state, quote: payload }
        }
        case QUOTED: {
            return {...state, quote: ''}
        }
        default: 
        return state
    }
}

export default thread;