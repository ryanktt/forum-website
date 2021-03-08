import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import style from './NewPost.module.css';
import Post from '../../components/Post/Post';
import {getSubstringsBetween} from '../../utils/textFormat';



const NewPost = (props) => {
    const {quote, submit, button, getContent, contentValue} = props;
    const [content, setContent] = useState('');
    const [selectedContent, setSelectedContent] = useState({
        startIndex: 0,
        endIndex: 0,
        text: ''
    })
    const [chosenEmoji, setChosenEmoji] = useState({
        emoji: null
    });

    useEffect(() => {
        if(quote === '') return;
        if(content !== '') return setContent(content + '\n' + quote.message);
        setContent(content + quote.message);
    }, [quote]);

    useEffect(() => {
        if(getContent) getContent(content);
    }, [content])

    useEffect(() => {
        if(contentValue) {
            setContent(contentValue);
        }
    }, [contentValue])

    const parseBBCode = (postContent) => {
       const getQuoteInfo = getSubstringsBetween(postContent, '[quote', ']');
    }

    const onChange = e => {
        setContent(e.target.value) 
        
    }

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        const firstPart = content.substr(0, selectedContent.startIndex);
        const lastPart = content.substr(selectedContent.startIndex, content.length)
        const emojiAdded = `${firstPart}${emojiObject.emoji}${lastPart}`
        setContent(emojiAdded);
        
    };
    

    const onClickTag = tagType => {
        const firstPart = content.substr(0, selectedContent.startIndex);
        const lastPart = content.substr(selectedContent.endIndex, content.length)
        const tagWrappedText = `[${tagType}]${selectedContent.text}[/${tagType}]`
        setContent(firstPart + tagWrappedText + lastPart);
    }

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
        <div className={style.NewPost}>
            <form style={{padding: '0', boxShadow: 'none'}} onSubmit={(e) => {submit(e, content); setContent('')}}>
                <Post button={button} chosenEmoji={chosenEmoji.emoji} emojiClicked={onEmojiClick} select={onSelect} tagClicked={onClickTag} content={content} change={onChange} quote={quote}/>
            </form>
        </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        quote: state.post.quote
        
    }
}

export default connect(mapStateToProps)(NewPost);
