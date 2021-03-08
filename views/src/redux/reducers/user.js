import {FETCH_USER, FETCH_THREADS, FETCH_POSTS, RESET_POSTS, RESET_THREADS, SEARCH, NOTIFICATIONS, NOTIFICATION_COUNT} from '../actions/actionTypes/userTypes';

const initialState = {
    data: null,
    threads: null,
    posts: null,
    search: null,
    notifications: {
        data: null,
        pagination: null,
        count: null
    }
};

const user = (state = initialState, action) => {
    const {payload, type} = action
    switch(type) {
        case FETCH_USER:
            return {...state, data: payload}
        case FETCH_THREADS:
            return {...state, threads: payload}
        case FETCH_POSTS:
            return {...state, posts: payload}
        case RESET_POSTS: {
            return {...state, posts: null}
        }
        case RESET_THREADS: {
            return {...state, threads: null}
        }
        case SEARCH: {
            return {...state, search: payload}
        }
        case NOTIFICATIONS:  {
            return {...state, notifications: {...state.notifications, ...payload}}
        }
        case NOTIFICATION_COUNT: {
            return {...state, notifications: {...state.notifications, count: payload}}
        }
        default: 
            return state;
    }

}

export default user;
