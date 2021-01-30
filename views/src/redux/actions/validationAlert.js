import { v4 as uuidv4 } from 'uuid';
import {SET_ALERT, REMOVE_ALERT} from '../actions/actionTypes/commonTypes';


export const validationAlert =  (msg, type, time = 5000) => async (dispatch, getState) => {
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

    //REMOVE ALERTS WHEN USER CHANGES PAGE, CONSTANTLY CHECKS

    const currentPath = window.location.pathname.slice();
    const alertMessagesArr = getState().valAlert;

    if(alertMessagesArr.length > 1) {
            const checkPath = setInterval(() => {
            console.log('intervalInWork')
            if(currentPath !== window.location.pathname) {
                dispatch({
                    type: REMOVE_ALERT,
                    payload: id
                });
                clearInterval(checkPath);
            }

        }, 150);
    }
      

}