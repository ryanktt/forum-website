import axios from '../../utils/axios';
import {EDIT_THREAD, EDIT_POST, DELETE_THREAD, EDIT_USER, DELETE_POST, BAN_USER, REMOVE_BAN} from './actionTypes/adminTypes';
import {validationAlert as setAlert} from './validationAlert';

export const editUserProfile = (userId, data) => async dispatch => {
    try {
        await axios.put(`/admin/account/update-profile/${userId}`, data);
        dispatch({type: EDIT_USER});
        return 'success';
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.map(error => { 
                return dispatch(setAlert(error.msg, 'danger'));
            })
            
        } 
        console.error(err);
        return 'err';
    }

}

export const banUser = (userId, time) => async dispatch => {
    try {
        await axios.put(`admin/ban/${userId}`, {time: time});
        dispatch(setAlert('Banido com Sucesso', 'success'));
        dispatch({type: BAN_USER});
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.map(error => { 
                return dispatch(setAlert(error.msg, 'danger'));
            })
            
        } 
        console.log(err);
    }
}

export const unbanUser = (userId) => async dispatch => {
    try {
        await axios.put(`admin/unban/${userId}`);
        dispatch(setAlert('Banimento Removido com Sucesso', 'success'));
        dispatch({type: REMOVE_BAN});
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.map(error => { 
                return dispatch(setAlert(error.msg, 'danger'));
            })
            
        } 
        console.log(err);
    }
}

export const editThread = (threadId, threadData) => async dispatch => {
    try {
        await axios.put(`admin/thread/${threadId}`, threadData);
        dispatch(setAlert('Editado com Sucesso', 'success'));
        dispatch({type: EDIT_THREAD});
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.map(error => { 
                return dispatch(setAlert(error.msg, 'danger'));
            })
            
        } 
        console.log(err);
        return 'err';
    }

}

export const editPost = (postId, content) => async dispatch => {
    try {
        await axios.put(`admin/edit-post/${postId}`, {content: content});
        dispatch(setAlert('Editado com Sucesso', 'success'));
        dispatch({type: EDIT_POST});
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.map(error => { 
                return dispatch(setAlert(error.msg, 'danger'));
            })
            
        } 
        console.log(err);
        return 'err';
    }

}

export const deleteThread = (threadId) => async dispatch => {
    try {
        await axios.delete(`admin/thread/${threadId}`);
        dispatch(setAlert('Deletado com Sucesso', 'success'));
        dispatch({type: DELETE_THREAD});
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.map(error => { 
                return dispatch(setAlert(error.msg, 'danger'));
            })
            
        } 
        console.log(err);
    }

}

export const deletePost = (postId) => async dispatch => {
    try {
        await axios.delete(`admin/post/${postId}`);
        dispatch(setAlert('Deletado com Sucesso', 'success'));
        dispatch({type: DELETE_POST});
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.map(error => { 
                return dispatch(setAlert(error.msg, 'danger'));
            })
            
        } 
        console.log(err);
    }
    
}