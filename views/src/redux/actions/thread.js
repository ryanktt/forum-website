import axios from '../../utils/axios';
import {NEW_THREAD, NEW_POST, FETCH_THREADS, FETCH_THREAD, FETCH_START, REFETCH} from './actionTypes/threadTypes';
import {LOADING, STOP_LOADING} from './actionTypes/commonTypes';


export const fetchThreads = category => async dispatch => {
    dispatch({type: FETCH_START});
    dispatch({type: LOADING});
    try {
        const threads = await axios.get(`/threads/${category}`);

        dispatch({type: FETCH_THREADS, payload: threads.data});
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


export const newPost = (threadData, threadId) => async dispatch => {
    const data = {content: threadData.content, threadId: threadId};

    try {
        const post = await axios.post('/user/post', data);
        dispatch({
            type: NEW_POST
        });
        return post;
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