import {LOADING, STOP_LOADING} from '../actions/actionTypes/commonTypes';

const initialState = {
    loading: false
};

const loading = (state = initialState, action) => {
    switch(action.type) {
        case LOADING:
            return {loading: true}
        case STOP_LOADING:
            return {loading: false}
        default:
            return state 
    }

}

export default loading;