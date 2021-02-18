import { NEW_THREAD, NEW_POST, FETCH_THREADS, FETCH_START, FETCH_THREAD, REFETCH} from '../actions/actionTypes/threadTypes';

const initialState = {
    threadList: null,
    threadsPagination: null,
    thread: null,
    fetching: false,
    reFetch: true,

}

const thread = (state = initialState, action) => {
    const {threads, threadsPagination, payload, type} = action;
    switch(type) {
        case FETCH_START: {
            return {...state, fetching: true, reFetch: false}
        }
        case FETCH_THREADS: {
            return {...state, 
                threadList: threads, 
                threadsPagination: threadsPagination, 
                loading: false, fetching: false, reFetch: false
            }
        }
        case FETCH_THREAD: {
            return {...state, thread: payload, loading: false, fetching: false, reFetch: false}
        }
        case NEW_THREAD: {
            return {...state, loading: false}
        }
        case NEW_POST: {
            return {...state, loading: false}
        }
        case REFETCH: {
            return {...state, reFetch: true}
        }
        default: 
        return state
    }
}

export default thread;