import { NEW_THREAD, NEW_POST, THREAD_LOADING, FETCH_THREADS } from '../actions/actionTypes/threadTypes';

const initialState = {
    loading: false,
    threadList: null
}

const thread = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_THREADS: {
            return {...state, threadList: action.payload}
        }
        case THREAD_LOADING: {
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