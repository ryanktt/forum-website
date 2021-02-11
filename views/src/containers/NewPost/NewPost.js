import React, { useState } from 'react';
import {connect} from 'react-redux';
import style from './NewPost.module.css';
import Post from '../../components/Post/Post';
import {newPost, reFetchPage} from '../../redux/actions/thread';
import {validationAlert} from '../../redux/actions/validationAlert';
import ValidationMsgs from '../../components/UI/Validation/ValidationMsgs';

const NewPost = (props) => {
    const {makeNewPost, threadId, reFetch, setAlert} = props;
    const [content, setContent] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if(content === '') {
            return setAlert('Texto Vazio', 'danger')
        }

        await makeNewPost(content, threadId);
        reFetch();

    }

    const onChange = (e) => {
        setContent(e.target.value);
    }

    return (
        <>
        <ValidationMsgs/>
        <div className={style.NewPost}>
            <form onSubmit={(e) => onSubmit(e)}>
                <Post button change={(e) => onChange(e)}/>
            </form>
        </div>
        </>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        makeNewPost: (content, threadId) => dispatch(newPost(content, threadId)),
        reFetch: () => dispatch(reFetchPage),
        setAlert: (msg, type) => dispatch(validationAlert(msg, type))
    }
}

export default connect(null, mapDispatchToProps)(NewPost);
