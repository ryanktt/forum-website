import React, { useState, useEffect } from 'react';
import { renderToString } from 'react-dom/server'
import {connect} from 'react-redux';
import style from './NewPost.module.css';
import Post from '../../components/Post/Post';
import {newPost, reFetchPage} from '../../redux/actions/thread';
import {quoted} from '../../redux/actions/makePost';
import {validationAlert} from '../../redux/actions/validationAlert';
import ValidationMsgs from '../../components/UI/Validation/ValidationMsgs';
import {getSubstringsBetween} from '../../utils/textFormat';


const NewPost = (props) => {
    const {makeNewPost, threadId, reFetch, setAlert, quote, quoted} = props;
    const [content, setContent] = useState('');
    const [selectedContent, setSelectedContent] = useState({
        startIndex: 0,
        endIndex: 0,
        text: ''
    })

    useEffect(() => {
        if(quote === '') return;
        if(content !== '') return setContent(content + '\n' + quote.message);
        setContent(content + quote.message);
    }, [quote]);

    const parseBBCode = (postContent) => {
       const getQuoteInfo = getSubstringsBetween(postContent, '[quote', ']');
    }

    const onSubmit = async e => {
        parseBBCode(content)

        e.preventDefault();
        if(content === '') {
            return setAlert('Texto Vazio', 'danger');
        }

        await makeNewPost(content, threadId);
        reFetch();
        setContent('');
        quoted();
    }

    const onChange = e => {
        setContent(e.target.value)
        
    }
    console.log(selectedContent);
    const onSelect = e => {
        const startIndex = e.currentTarget.selectionStart
        const endIndex = e.currentTarget.selectionEnd
        const text = e.target.value.substring(startIndex, endIndex)
        setSelectedContent({
            startIndex: startIndex,
            endIndex: endIndex,
            text: text
        })
    }
    return (
        <>
        <ValidationMsgs/>
        <div className={style.NewPost}>
            <form onSubmit={(e) => onSubmit(e)}>
                <Post button select={onSelect} content={content} change={onChange} quote={quote}/>
            </form>
        </div>
        </>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        makeNewPost: (content, threadId) => dispatch(newPost(content, threadId)),
        reFetch: () => dispatch(reFetchPage),
        setAlert: (msg, type) => dispatch(validationAlert(msg, type)),
        quoted: () => dispatch(quoted)
    }
}

export default connect(null, mapDispatchToProps)(NewPost);
