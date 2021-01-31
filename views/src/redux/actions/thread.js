import axios from '../../utils/axios';
import {NEW_THREAD, NEW_POST, THREAD_LOADING, FETCH_THREADS} from './actionTypes/threadTypes';

export const fetchThreads = async dispatch => {
    try {
        const threads = await axios.get('/threads')

        dispatch({type: FETCH_THREADS, payload: threads.data})

    } catch (err) {
        console.error(err)
    }
}

export const newThread = (threadData) => async dispatch => {
    dispatch({
        type: THREAD_LOADING
    })
    let thread = {title: threadData.title, category: threadData.category};
    const threadContent = {content: threadData.content}
    try {
        //make the post and get its id
        let postId = await axios.post('/user/post', threadContent);
        postId = postId.data.id;
        //pass id to new thread to reference thread model
        await axios.post('/user/thread', {...thread, postId: postId});

        dispatch({
            type: NEW_THREAD
        });
        
    } catch (err) {
        const errors = err.response.data.errors;
        if(erros) {
            console.log(errors);
        }
        console.log(err)
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
        if(erros) {
            console.log(errors);
        }
        console.log(err)
        
    }
}