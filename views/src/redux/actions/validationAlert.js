import { v4 as uuidv4 } from 'uuid';
import {SET_ALERT, REMOVE_ALERT} from '../actions/actionTypes/commonTypes';


export const validationAlert = (msg, type, time = 3000) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: {msg, type, id}
    });

    setTimeout(() => {
        dispatch({
            type: REMOVE_ALERT,
            payload: id
        });
    }, time);
}