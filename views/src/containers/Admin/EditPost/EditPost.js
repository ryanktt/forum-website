import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from '../../../utils/axios';
import NewPost from '../../NewPost/NewPost';
import Button from '../../../components/UI/Button/Button';
import {editPost} from '../../../redux/actions/admin';
import {reFetchPage} from '../../../redux/actions/thread';
import ValidationMsgs from '../../../components/UI/Validation/ValidationMsgs';
import Form from '../../../components/UI/Form/Form';

const EditPost = (props) => {
    const {match, editPost, setReFetch} = props;
    const [content, setContent] = useState('');

    useEffect(() => {
        if(match.params) {
            (async() => {
                const res = await axios.get(`/post/${match.params.id}`);
                const postContent = res.data.content;
                setContent(postContent);
            })()
        }
    }, [match.params])

    const onGetContent = content => {
        setContent(content);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        editPost(match.params.id, content);
        setReFetch();
    }

    return (
        <div>
            <h2 style={{color: 'rgb(31, 31, 31)'}}>Editar Post</h2>
            <ValidationMsgs/>
            <Form submited={(e) => onSubmit(e)}>
                <NewPost getContent={onGetContent} contentValue={content}/>
                <div style={{width: 'max-content', margin: '15px auto'}}>
                    <Button button type='submit' >Editar Post</Button>
                </div>
            </Form>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        editPost: (postId, content) => dispatch(editPost(postId, content)),
        setReFetch: () => dispatch(reFetchPage)
    }
}

export default connect(null, mapDispatchToProps)(EditPost);
