import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../../components/UI/Modal/Modal';
import Button from '../../../components/UI/Button/Button';
import {deletePost, deleteThread} from '../../../redux/actions/admin';
import {reFetchPage} from '../../../redux/actions/thread';

const ThreadModal = (props) => {
    const {active, close, deletePost, deleteThread, history, match, threadId, postId, postNumber, setReFetch} = props;

    const onDeletePost = async () => {
        await deletePost(postId);
        setReFetch();
    };

    const onDeleteThread = async () => {
        await deleteThread(threadId);
        if(!match.params.category) return history.push('/user/conversations');
        history.push(`/threads/${match.params.category}`);
        setReFetch();
    };


    let editBtnText = 'Editar Post';
    let editBtnLink = `/admin/edit-post/${postId}`;
    if(postNumber === 1) {
        editBtnText = 'Editar Tópico';
        editBtnLink = `/admin/edit-thread/${threadId}?ctgry=${match.params.category}`;
    }
    return (
        <Modal active={active} close={close} title='Ações de Administrador'>
                <div>
                    {postNumber !== 1 
                    ? <div onClick={onDeletePost}><Button danger medium>Deletar Post</Button></div>
                    : <div onClick={onDeleteThread}><Button danger medium>Deletar Tópico</Button></div>}
                    <div><Button link={editBtnLink} success medium>{editBtnText}</Button></div>
                </div>
            </Modal>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deletePost: (postId) => dispatch(deletePost(postId)),
        deleteThread: (threadId) => dispatch(deleteThread(threadId)),
        setReFetch: () => dispatch(reFetchPage)
    }
}


export default connect(null, mapDispatchToProps)(ThreadModal);





