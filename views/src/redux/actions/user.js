import axios from '../../utils/axios';
import {FETCH_THREADS, FETCH_USER, FETCH_POSTS, RESET_THREADS, RESET_POSTS, REPORT, SEARCH, NOTIFICATIONS, NOTIFICATION_COUNT} from '../actions/actionTypes/userTypes';
import {LOADING, STOP_LOADING} from './actionTypes/commonTypes';
import {loadUser} from './auth';

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
        
        const pagination = {...userThreads.data};
        delete pagination.docs;
        dispatch({type: FETCH_THREADS, payload: {data: userThreads.data.docs, pagination: pagination }});

        dispatch({type: STOP_LOADING});
    } catch (err) {
        console.error(err);
        dispatch({type: STOP_LOADING});
    }
}

export const fetchPosts = param => async dispatch => {
    const {userId, currentPage} = param;

    dispatch({type: LOADING});
    try {
        const userPosts = await axios.get(`/member/posts/${userId}${currentPage}`);
        const pagination = {...userPosts.data};
        delete pagination.docs;
        dispatch({type: FETCH_POSTS, payload: {data: userPosts.data.docs, pagination: pagination }});

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

export const updateProfile = data => async (dispatch) => {
    try {
        await axios.put('/user/account/update-profile', data);
        loadUser(dispatch);
        return 'success';
    } catch (err) {
        console.error(err);
        return 'err';
    }
}

export const report = (message, threadId, postId, userId) => async  dispatch => {
    const data = {message, threadId, postId, userId}

    try {
        await axios.post('/user/report', data);
        dispatch({type: REPORT});
    } catch (err) {
        console.erro(err);
        return 'err';
    }
} 

export const search = (text, page) => async dispatch => {
    dispatch({type: LOADING});
    if(!page) page = '&page=1';
    try {
        if (text === '') {
            return dispatch({type: STOP_LOADING});
        }
        const posts = await axios.get(`/user/search?text=${text}${page.replace('?', '&')}`);
        const pagination = {...posts.data};
        delete pagination.docs;
        dispatch({type: SEARCH, payload: {data: posts.data.docs, pagination: pagination, text: text }});
        dispatch({type: STOP_LOADING});
    } catch (err) {
        console.error(err);
        dispatch({type: STOP_LOADING});
    }
}

export const fetchNotifications = page =>async dispatch => {
    dispatch({type: LOADING});
    try {
        const notifications = await axios.get(`/user/notifications${page}`);
        const pagination = {...notifications.data};
        delete pagination.docs;
        dispatch({type: NOTIFICATIONS, payload: {data: notifications.data.docs, pagination: pagination}});
        dispatch(getNotificationCount);
        dispatch({type: STOP_LOADING});
    } catch (err) {
        console.error(err);
        dispatch({type: STOP_LOADING});
    }
}

export const getNotificationCount = async dispatch => {
    try {
        const notificationCount = await axios.get('/user/notification-count');
        dispatch({type: NOTIFICATION_COUNT, payload: notificationCount.data});
    } catch (err) {
        console.error(err);
    }
}