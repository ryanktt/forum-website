import {SET_ALERT, REMOVE_ALERT} from '../actions/actionTypes/commonTypes';

const initialState = [];

const validationAlert = (state = initialState, action) => {
    switch(action.type) {
        case SET_ALERT:
            return [...state, action.payload]
        case REMOVE_ALERT:
            return state.filter(valAlert => valAlert.id !== action.payload)
        default:
            return state   
    }

}

export default validationAlert;