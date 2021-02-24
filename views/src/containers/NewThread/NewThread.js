import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import style from './NewThread.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Form from '../../components/UI/Form/Form';
import NewPost from '../../containers/NewPost/NewPost';
import {newThread, reFetchPage, newPrivateThread} from '../../redux/actions/thread';
import {validationAlert} from '../../redux/actions/validationAlert';
import Validation from '../../components/UI/Validation/ValidationMsgs';
import Dropdown from '../../components/Dropdown/Dropdown';
import {categories} from '../../utils/categories';
import queryString from 'query-string';


const NewThread = (props) => {
    let {location, history, newThread, reFetchPage, setAlert, newPrivateThread} = props;

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

        newPrivateThread(threadData);
    
    }
 
    useEffect(() => {
        if(query) if(query.with) if(isConversation) {
            return setThreadData({
                ...threadData,
                settings: {
                    status: 'private',
                    participants: query.with.split(',')
                }
            })
        }

        if(isConversation) {
            return setThreadData({
                ...threadData,
                settings: {
                    ...threadData.settings,
                    status: 'private'
                }
            })
        }

    }, [])

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
    <Dropdown options={categories} placeholder='Escolha uma categoria' required={true} change={onChange}/>
    </div>;
    let btnText = 'Postar Tópico';

    if (location.pathname === '/user/new-conversation') {
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

    
    return (
        <>
            <div className={style.NewThread}>
                <h2>{title}</h2>
                <div style={{margin:'0 auto'}}><Validation/></div>
                <Form submited={(e) => onSubmit(e)} >
                    {participantsInput}
                    <div style={{marginBottom: '15px'}}><Input required label='Título' change={onChange} name='title'/></div>
                    {chooseCategory}
                    <NewPost getContent={onGetContent}/>
                    <div className={style.Button}>
                        <Button button>{btnText}</Button>
                    </div>
                </Form>
                    
            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setAlert: (msg, type) => dispatch((validationAlert(msg, type))),
        newThread: (data) => dispatch(newThread(data)),
        newPrivateThread: (data) => dispatch(newPrivateThread(data)),
        reFetchPage: () => dispatch(reFetchPage)
        
    }
}

export default connect(null, mapDispatchToProps)(NewThread);
