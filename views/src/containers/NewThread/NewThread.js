import React, {useState} from 'react';
import {connect} from 'react-redux';
import style from './NewThread.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Form from '../../components/UI/Form/Form';
import Post from '../../components/Post/Post';
import {newThread, reFetchPage} from '../../redux/actions/thread';
import Validation from '../../components/UI/Validation/ValidationMsgs';
import Dropdown from '../../components/Dropdown/Dropdown';
import {categories} from '../../utils/categories';
import queryString from 'query-string';

const NewThread = (props) => {
    let {location, history, newThread, reFetchPage} = props;

    const [threadData, setThreadData] = useState({
        title: '',
        content: '',
        category: '',
    })


    const onSubmit = async (e) => {
        e.preventDefault()

        await newThread(threadData)
        const query = queryString.parse(location.search)

        reFetchPage()
        history.push(`/threads/${query.ctgry}`);
        
        
    
    }


    const onChange = e => { 
        

        setThreadData({
            ...threadData,
            [e.target.name]: e.target.value
        })
    }

    
    return (
        <>
            <div style={{margin:'0 auto'}}><Validation/></div>
            <div className={style.NewThread}>
                <h2>Novo Tópico</h2>
                <Form submited={(e) => onSubmit(e)} >
                    <Input required label='Título' change={onChange} name='title'/>
                    <div style={{margin:'15px 0'}}>
                        <Dropdown options={categories} placeholder='Escolha uma categoria' required change={onChange}/>
                    </div>
                    <Post change={onChange}/>
                    <div className={style.Button}>
                        <Button button>Postar Tópico</Button>
                    </div>
                </Form>
                    
            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        newThread: (data) => dispatch(newThread(data)),
        reFetchPage: () => dispatch(reFetchPage)
        
    }
}

export default connect(null, mapDispatchToProps)(NewThread);
