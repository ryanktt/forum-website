import { NEW_THREAD, NEW_POST, THREAD_LOADING, FETCH_THREADS } from '../actions/actionTypes/threadTypes';

const initialState = {
    loading: false,
    threadList: []
}

const thread = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_THREADS: {
            return {...state, threadList: action.payload, loading: false}
        }
        case THREAD_LOADING: {
         return {...state, loading: true}
        }
        case 'THREAD_NOT_LOADING': {
            return {...state, loading: true}
           }
        case NEW_THREAD: {
            return {...state, loading: false}
        }
        case NEW_POST: {
            return {...state, loading: false}
        }
        default: 
        return state
    }
}

export default thread;