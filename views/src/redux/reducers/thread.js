import { NEW_THREAD, NEW_POST, FETCH_THREADS, FETCH_START, FETCH_THREAD, REFETCH, NEW_PRIVATE_THREAD, FETCH_PRIVATE_THREADS, FETCH_PRIVATE_THREAD, SET_PATH} from '../actions/actionTypes/threadTypes';

const initialState = {
    threadList: null,
    threadsPagination: null,
    thread: null,
    fetching: false,
    reFetch: true,
    path: null

}

const thread = (state = initialState, action) => {
    const {threads, threadsPagination, payload, type} = action;
    switch(type) {
        case FETCH_START: {
            return {...state, fetching: true, reFetch: false}
        }
        case FETCH_PRIVATE_THREADS:
        case FETCH_THREADS: {
            return {...state, 
                threadList: threads, 
                threadsPagination: threadsPagination, 
                loading: false, fetching: false, reFetch: false
            }
        }
        case FETCH_PRIVATE_THREAD:
        case FETCH_THREAD: {
            return {...state, thread: payload, loading: false, fetching: false, reFetch: false}
        }
        case NEW_PRIVATE_THREAD:
        case NEW_THREAD: {
            return {...state, loading: false, fetching: false, reFetch: false}
        }
        case NEW_POST: {
            return {...state, loading: false, fetching: false, reFetch: false}
        }
        case REFETCH: {
            return {...state, reFetch: true}
        }
        case SET_PATH: {
            return {...state, path: payload}
        }
        default: 
        return state
    }
}

export default thread;