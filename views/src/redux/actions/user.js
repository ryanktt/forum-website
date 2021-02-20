import axios from '../../utils/axios';
import {FETCH_THREADS, FETCH_USER, FETCH_POSTS, RESET_THREADS, RESET_POSTS} from '../actions/actionTypes/userTypes';
import {LOADING, STOP_LOADING} from './actionTypes/commonTypes';

export const fetchUser = userId => async dispatch => {
    dispatch({type: LOADING});
    try {
        const user = await axios.get(`/member/${userId}`);
        dispatch({type: FETCH_USER, payload: user.data});

        dispatch({type: STOP_LOADING});
    } catch (err) {
        console.error(err);
        dispatch({type: STOP_LOADING});
    } 
}

export const fetchThreads = param => async dispatch => {
    const {userId, currentPage} = param;

    dispatch({type: LOADING});
    try {
        const userThreads = await axios.get(`/member/threads/${userId}${currentPage}`);
        const pagination = {...userThreads.data}
        delete pagination.docs;
        dispatch({type: FETCH_THREADS, payload: {data: userThreads.data.docs, pagination: pagination }});

        dispatch({type: STOP_LOADING});
    } catch (err) {
        console.error(err);
        dispatch({type: STOP_LOADING});
    }
}

export const fetchPosts = userId => async dispatch => {
    dispatch({type: LOADING});
    try {
        const userPosts = await axios.get(`/member/posts/${userId}`);
        dispatch({type: FETCH_POSTS, payload: userPosts.data});

        dispatch({type: STOP_LOADING});
    } catch (err) {

        console.error(err);
        dispatch({type: STOP_LOADING});
    }
}

export const reset = type => dispatch => {
    if (type === 'threads') dispatch({type: RESET_THREADS});
    if (type === 'posts') dispatch({type: RESET_POSTS});
}