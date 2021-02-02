import React, {useState} from 'react';
import {connect} from 'react-redux';
import style from './NewThread.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Form from '../../components/UI/Form/Form';
import Post from '../../components/Post/Post';
import {newThread} from '../../redux/actions/thread';

const NewThread = (props) => {
    const [threadData, setThreadData] = useState({
        title: '',
        content: '',
        category: 'pc'
    })

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await props.newThread(threadData);
        } catch (err) {
            console.error(err);
        }
    }

    const onChange = e => {
        
        setThreadData({
            ...threadData,
            [e.target.name]: e.target.value
        })
    }
    
    return (
        <div className={style.NewThread}>
            <h2>Novo Tópico</h2>
            <Form submited={(e) => onSubmit(e)} >
                <Input required label='Título' change={onChange} name='title'/>
                <Post change={onChange}/>
                <div className={style.Button}>
                    <Button button>Postar Tópico</Button>
                </div>
            </Form>
                
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        newThread: (data) => dispatch(newThread(data))
    }
}

export default connect(null, mapDispatchToProps)(NewThread);
