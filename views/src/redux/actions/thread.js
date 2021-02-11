import axios from '../../utils/axios';
import {NEW_THREAD, NEW_POST, FETCH_THREADS, FETCH_THREAD, FETCH_START, REFETCH} from './actionTypes/threadTypes';
import {LOADING, STOP_LOADING} from './actionTypes/commonTypes';


export const fetchThreads = param => async dispatch => {
    dispatch({type: FETCH_START});
    dispatch({type: LOADING});


    try {
        const threads = await axios.get(`/threads/${param.category}${param.currentPage}`);
        const pagination = {...threads.data}
        delete pagination.docs
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
    const threadPost = {content: threadData.content};
    try {
        //make the post and get its id
        let postId = await axios.post('/user/post', threadPost);
        postId = postId.data.id;

        //pass id to new thread to reference thread model
        const threadResponse = await axios.post('/user/thread', {...thread, postId: postId});

        const threadId = threadResponse.data.id;
        //get thread id and pass it back to post for reference
        await axios.post('/user/post', {...threadPost, threadId, postId});

        dispatch({type: NEW_THREAD });
        dispatch({type:STOP_LOADING});
    } catch (err) {

        console.log(err)
        dispatch({type:STOP_LOADING});
    }
}


export const newPost = (content, threadId) => async dispatch => {
    const data = {content: content, threadId: threadId};
    console.log(data)

    try {
        await axios.post('/user/post', data);
        dispatch({
            type: NEW_POST
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            console.log(errors);
        }
        console.log(err)
        
    }
}

export const reFetchPage  = dispatch => {
    dispatch({type: REFETCH});
}