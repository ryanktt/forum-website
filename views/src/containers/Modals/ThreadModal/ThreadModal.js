import React, {useState} from 'react';
import style from './ThreadModal.module.css';
import {connect} from 'react-redux';
import Modal from '../../../components/UI/Modal/Modal';
import Button from '../../../components/UI/Button/Button';
import {deletePost, deleteThread} from '../../../redux/actions/admin';
import {reFetchPage} from '../../../redux/actions/thread';
import {TextareaAutosize} from '@material-ui/core';

const ThreadModal = (props) => {
    const {active, close, deletePost, deleteThread, history, match, threadId, postId, postNumber, setReFetch, user} = props;
    const [reportMsg, setReportMsg] = useState('');
    const isAdmin = user.settings.role >= 2

    const onDeletePost = async () => {
        await deletePost(postId);
        setReFetch();
    };

    const onDeleteThread = async () => {
        await deleteThread(threadId);
        if(!match.params.category) {
            history.push('/user/conversations');
            setReFetch();
        } else {
            history.push(`/threads/${match.params.category}`);
            setReFetch();
        }
    };

    const submitReport = () => {
        
    }



    let editBtnText = 'Editar Post';
    let editBtnLink = `/admin/edit-post/${postId}`;
    if(postNumber === 1) {
        editBtnText = 'Editar Tópico';
        editBtnLink = `/admin/edit-thread/${threadId}?ctgry=${match.params.category}`;
    }
    return (
        isAdmin ? <Modal active={active} close={close} title='Ações de Administrador'>
            <div>
                {postNumber !== 1 
                ? <div onClick={onDeletePost}><Button danger medium>Deletar Post</Button></div>
                : <div onClick={onDeleteThread}><Button danger medium>Deletar Tópico</Button></div>}
                <div><Button link={editBtnLink} success medium>{editBtnText}</Button></div>
            </div>
        </Modal> 
        : <Modal active={active} close={close} title='Reportar Conteúdo'>
            <h4 style={{marginBottom: '15px'}}>Digite o Motivo de Reportar</h4>
            <div>
                <TextareaAutosize 
                    rowsMin={5} 
                    name='report-message' 
                    value={reportMsg} 
                    onChange={(e) => setReportMsg(e.target.value)}
                    className={style.Textarea}/>
            </div>            
            <div style={{width: 'max-content', margin: '10px auto'}} onClick={submitReport}>
                <Button medium>Reportar</Button>
            </div>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deletePost: (postId) => dispatch(deletePost(postId)),
        deleteThread: (threadId) => dispatch(deleteThread(threadId)),
        setReFetch: () => dispatch(reFetchPage)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ThreadModal);





