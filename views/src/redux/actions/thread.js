import axios from '../../utils/axios';
import {NEW_THREAD, NEW_POST, FETCH_THREADS, FETCH_THREAD, FETCH_START, REFETCH, NEW_PRIVATE_THREAD, FETCH_PRIVATE_THREADS, FETCH_PRIVATE_THREAD} from './actionTypes/threadTypes';
import {LOADING, STOP_LOADING} from './actionTypes/commonTypes';
import {validationAlert as valAlert} from './validationAlert';

export const reFetchPage  = dispatch => {
    dispatch({type: REFETCH});
}

export const fetchThreads = param => async dispatch => {
    dispatch({type: FETCH_START});
    dispatch({type: LOADING});


    try {
        const threads = await axios.get(`/threads/${param.category}${param.currentPage}`);
        const pagination = {...threads.data};
        delete pagination.docs;
        dispatch({type: FETCH_THREADS, threads: threads.data.docs, threadsPagination: pagination});
        dispatch({type:STOP_LOADING});
    } catch (err) {
        console.error(err);
        dispatch({type:STOP_LOADING});
    }
}

export const fetchThread = threadId => async dispatch => {
    dispatch({type: FETCH_START});
    dispatch({type: LOADING});

    try {
        const thread = await axios.get(`/thread/${threadId}`);
        dispatch({type: FETCH_THREAD, payload: thread.data});

        dispatch({type:STOP_LOADING});
    } catch (err) {
        console.error(err);

        dispatch({type:STOP_LOADING});
    }
} 

export const newThread = (threadData) => async dispatch => {
    dispatch({type: LOADING});
    let thread = {title: threadData.title, category: threadData.category};
    const threadPost = {content: threadData.content, category: threadData.category};
    try {
        //make the post and get its id
        let postId = await axios.post('/user/post', threadPost);
        postId = postId.data.id;

        //pass id to new thread to reference thread model
        const threadResponse = await axios.post('/user/thread', {...thread, postId: postId});

        const threadId = threadResponse.data.id;
        //get thread id and pass it back to post for reference
        if(threadId) await axios.post('/user/post', {...threadPost, threadId, postId});

        dispatch({type: NEW_THREAD });
        dispatch({type:STOP_LOADING});
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.map(error => { 
                return dispatch(valAlert(error.msg, 'danger'));
            })
            
        } 
        console.log(err);
        dispatch({type:STOP_LOADING});
        return 'err';
    }
}

export const newPost = (content, threadId, status, category) => async dispatch => {
    const data = {content: content, threadId: threadId, status: status, category: category};

    try {
        await axios.post('/user/post', data);
        dispatch({
            type: NEW_POST
        });
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.map(error => { 
                return dispatch(valAlert(error.msg, 'danger'));
            })
            
        } 
        console.log(err);
        
    }
}

//---

export const newPrivateThread = (threadData) => async dispatch => {
    dispatch({type: LOADING});
    let thread = {title: threadData.title, settings: threadData.settings};
    const threadPost = {content: threadData.content, status: 'private'};
    try {
        //make the post and get its id
        let postId = await axios.post('/user/post', threadPost);
        postId = postId.data.id;

        //pass id to new thread to reference thread model
        let threadResponse = null;
        if(postId) threadResponse = await axios.post('/user/private-thread', {...thread, postId: postId});
     
        const threadId = threadResponse.data.id;
        //get thread id and pass it back to post for reference
       
        if(threadId && postId) await axios.post('/user/post', {...threadPost, threadId, postId});

        dispatch({type: NEW_PRIVATE_THREAD });
        dispatch({type:STOP_LOADING});
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.map(error => { 
                return dispatch(valAlert(error.msg, 'danger'));
            })
            
        } 
        console.log(err);
        dispatch({type:STOP_LOADING});
        return 'err';
    }
}

export const fetchPrivateThreads = page => async dispatch => {
    dispatch({type: FETCH_START});
    dispatch({type: LOADING});

    try {
        const threads = await axios.get(`/user/threads${page}`);
        const pagination = {...threads.data};
        delete pagination.docs;
        dispatch({type: FETCH_PRIVATE_THREADS, threads: threads.data.docs, threadsPagination: pagination});
        dispatch({type:STOP_LOADING});
    } catch (err) {
        console.error(err);
        dispatch({type:STOP_LOADING});
    }
}

export const fetchPrivateThread = threadId => async dispatch => {
    dispatch({type: FETCH_START});
    dispatch({type: LOADING});

    try {
        const thread = await axios.get(`/user/thread/${threadId}`);
        dispatch({type: FETCH_PRIVATE_THREAD, payload: thread.data});

        dispatch({type:STOP_LOADING});
    } catch (err) {
        console.error(err.response);

        dispatch({type:STOP_LOADING});
    }
} 