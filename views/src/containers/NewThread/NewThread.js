import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import style from './NewThread.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Form from '../../components/UI/Form/Form';
import NewPost from '../../containers/NewPost/NewPost';
import {newThread, reFetchPage, newPrivateThread, fetchThread} from '../../redux/actions/thread';
import {editThread} from '../../redux/actions/admin';
import Validation from '../../components/UI/Validation/ValidationMsgs';
import Dropdown from '../../components/Dropdown/Dropdown';
import {categories} from '../../utils/categories';
import queryString from 'query-string';


const NewThread = (props) => {
    let {location, history, newThread, reFetchPage, newPrivateThread, editThread, match, thread, fetchThread} = props;

    const [threadData, setThreadData] = useState({
        title: '',
        content: '',
        category: '',
        settings: {status: 'public', participants: []}
    })
    
    const query = queryString.parse(location.search);
    const path = location.pathname;

    let onSubmit = async (e) => {
        e.preventDefault()

        const res = await newThread(threadData)
        if (res === 'err') return;
        reFetchPage();
        history.push(`/threads/${query.ctgry}`);
        
    }

    const onChange = e => { 
        setThreadData({
            ...threadData,
            [e.target.name]: e.target.value
        })

    }

    const onGetContent = content => {
        setThreadData({
            ...threadData,
            content: content
        })
    }

    //Private Message
    const isConversation = path === '/user/new-conversation';

    if(isConversation) onSubmit = async (e) => {
        e.preventDefault();
        const res = await newPrivateThread(threadData);
        if(res !== 'err') {
            history.push(`/user/conversations`);
            reFetchPage();
        }
    }
 
    useEffect(() => {
        if(query) if(query.with) if(isConversation) {
            return setThreadData({
                ...threadData,
                category: 'conversation',
                settings: {
                    status: 'private',
                    participants: query.with.split(',')
                }
            })
        }

        if(isConversation) {
            return setThreadData({
                ...threadData,
                category: 'conversation',
                settings: {
                    ...threadData.settings,
                    status: 'private'
                }
            })
        }

    }, [isConversation])

    const onPartsChange = (e) => {

        const participants = {
            status: 'private',
            participants: e.target.value.replace(/ /g, '').split(',')
        };

        setThreadData({
            ...threadData,
            settings: participants
        });
    }
    
    let title = 'Novo Tópico';
    let participantsInput = null;
    let chooseCategory = <div style={{marginBottom:'15px'}}>
    <Dropdown options={categories} placeholder='Escolha uma categoria' value={threadData.category} required={true} change={onChange}/>
    </div>;
    let btnText = 'Postar Tópico';

    if (isConversation) {
        title = 'Mensagem Privada';
        participantsInput = <>
        <Input value={threadData.settings.participants} required label='Participantes' change={onPartsChange} name='participants'/>
            <p style={{color: 'grey', fontSize: '13px', margin: '2px 0 15px 0'}}>
                Digite o nome dos usuários que participarão, separados por vírgula.
            </p>
        </>
        chooseCategory = null;
        btnText = 'Iniciar Conversa'

    }
    let newThreadContainer = <div className={style.NewThread}>
        <h2>{title}</h2>
        <div style={{margin:'0 auto'}}><Validation/></div>
            <Form submited={(e) => onSubmit(e)} >
                {participantsInput}
                <div style={{marginBottom: '15px'}}><Input required label='Título' change={onChange} name='title'/></div>
                {chooseCategory}
                <NewPost getContent={onGetContent}/>
                <div className={style.Button}>
                    <Button type='submit' button>{btnText}</Button>
                </div>
            </Form>
        </div>


    //Edit Thread
    const threadId = match.params.id;
    const isEdit = path === `/admin/edit-thread/${threadId}`;

    useEffect(() => {
        if(isEdit) {
            if(!thread) (async() => await fetchThread(threadId))();
            if(thread) setThreadData({
                title: thread.title,
                category: thread.category,
                content: thread.posts[0].content
            })
        }
    }, [isEdit, thread])
    console.log(threadData)
    if (isEdit) {
        title = 'Editar Tópico';
        btnText= 'Editar Tópico'

        onSubmit = async (e) => {
            e.preventDefault();
       
            const res = await editThread(threadId, threadData);
            if(res !== 'err') {
                history.push(`/threads/${query.ctgry}`);
                reFetchPage();
            }
        }
    
        newThreadContainer = <div className={style.NewThread}>
                <h2>{title}</h2>
                <div style={{margin:'0 auto'}}><Validation/></div>
                <Form submited={(e) => onSubmit(e)} >
                    {participantsInput}
                    <div style={{marginBottom: '15px'}}><Input required label='Título' value={threadData.title} change={onChange} name='title'/></div>
                    {chooseCategory}
                    {!isEdit ? <NewPost getContent={onGetContent}/>
                    : <NewPost getContent={onGetContent} contentValue={threadData.content}/>}
                    <div className={style.Button}>
                        <Button type='submit' button>{btnText}</Button>
                    </div>
                </Form>
                    
        </div>
    }

    
    return (
        <>
            {newThreadContainer}
        </>
    )
}

const mapStateToProps = state => {
    return {
        thread: state.thread.thread
    }
}




const mapDispatchToProps = dispatch => {
    return {
        editThread: (threadId, threadData) => dispatch(editThread(threadId, threadData)),
        newThread: (data) => dispatch(newThread(data)),
        fetchThread: (threadId) => dispatch(fetchThread(threadId)),
        newPrivateThread: (data) => dispatch(newPrivateThread(data)),
        reFetchPage: () => dispatch(reFetchPage)
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewThread);
