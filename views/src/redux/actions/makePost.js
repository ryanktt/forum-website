import {SET_QUOTE, QUOTED} from './actionTypes/postTypes';

export const setQuote = quote => dispatch => {
    dispatch({type: SET_QUOTE, payload: quote});
}

export const quoted = dispatch => {
    dispatch({type: QUOTED});
}