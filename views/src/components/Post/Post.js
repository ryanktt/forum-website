import React, {useState, useEffect} from 'react';
import style from './Post.module.css';
import Button from '../UI/Button/Button';
import {TextareaAutosize} from '@material-ui/core';
import Picker, {SKIN_TONE_NEUTRAL} from 'emoji-picker-react';
import Backdrop from '../UI/Backdrop/Backdrop';
import parser from '../../utils/libraries/bbCodeToReact';


const Post = (props) => {
    const {button, change, select, tagClicked, emojiClicked, content} = props;
    let {chosenEmoji} = props;
    const [emojiState, setEmojiState] = useState({
        disableEmoji: style.Disable,
        backdrop: null
    });
    const [emojiPickerBox, setEmojiPickerBox] = useState(false);
    const [disableEmojiAlert, setDisableEmojiAlert] = useState(style.Disable);
    const [preview, setPreview] = useState(false)
    if (!chosenEmoji) chosenEmoji = '';

    let btn = null;
    if (button)  btn = <div className={style.Btn}><Button type='submit'  button >Novo Post</Button></div>


    useEffect(() => {
        if(content === '') {
            setPreview(false);
        }
    }, [content])

    const onEmojiClick = () => {
        setDisableEmojiAlert('')
        setTimeout(() => {
            setDisableEmojiAlert(style.Disable)
        }, 4000);
    }

    const onPreviewClick = () => {
        if(content !== '') setPreview(true)
    }

    const emojisOn = () => {
        setEmojiPickerBox(true)

        setEmojiState({
            ...emojiState,
            disableEmoji: '',
            backdrop: <Backdrop transparent clicked={emojisOff} />
        })
    };

    const emojisOff = () => {
        setEmojiState({
            ...emojiState,
            disableEmoji: style.Disable,
            backdrop: ''
        })
    }

    return (
        <div id='quote' className={style.NewPost}>
            {emojiState.backdrop}
            <div className={style.BBbar}>
                <div className={style.BBItems}>
                    <div onClick={() => tagClicked('b')} className={style.BBItem}><i className="fas fa-bold"></i><div className={style.EmojiDescription} ><p>Bold</p></div></div>
                    <div onClick={() => tagClicked('i')} className={style.BBItem}><i className="fas fa-italic"></i><div className={style.EmojiDescription} ><p>Itálico</p></div></div>
                    <div onClick={() => tagClicked('s')} className={style.BBItem}><i className="fas fa-strikethrough"></i><div className={style.EmojiDescription} ><p>Cortar</p></div></div>
                    <div onClick={() => tagClicked('img')} className={style.BBItem}><i className="far fa-image"></i><div className={style.EmojiDescription} ><p>Inserir Imagem</p></div></div>
                    <div onClick={() => tagClicked('url')} className={style.BBItem}><i className="fas fa-link"></i><div className={style.EmojiDescription} ><p>Inserir Link</p></div></div>
                    <div onClick={() => tagClicked('youtube')} className={style.BBItem}><i className="fab fa-youtube"></i><div className={style.EmojiDescription} ><p>Youtube</p></div></div>
                    <div onClick={() => tagClicked('twitter')} className={style.BBItem}><i class="fab fa-twitter"></i><div className={style.EmojiDescription} ><p>Tweet</p></div></div>
                    <div  className={style.BBItem} onClick={emojisOn}>
                        <i className="far fa-smile-wink"></i>
                        <div className={style.EmojiDescription}><p>Emoji</p></div>
                    </div>
                </div>
            </div>
            <div className={style.Content}>
                <div className={[style.EmojiPicker, emojiState.disableEmoji].join(' ')}>
                    <div className={[style.EmojiAlert, disableEmojiAlert].join(' ')}><p>Emoji Inserido: {chosenEmoji}</p></div>
                    {emojiPickerBox ? <Picker 
                    disableSkinTonePicker 
                    native
                    onEmojiClick={(e, emoji) => {emojiClicked(e, emoji); onEmojiClick()}} 
                    pickerStyle={{backgroundColor: 'rgb(250, 250, 250)', width: '100%', boxShadow: 'none', WebkitBoxShadow: 'none'}} 
                    skinTone={SKIN_TONE_NEUTRAL} /> : null}
                </div>
                <TextareaAutosize 
                rowsMin={5} 
                value={content} 
                name='content' 
                onChange={(e) => change(e)} 
                className={style.Textarea}
                onSelect={(e) => select(e)}/>
            </div>
            <div className={style.Btns}>
                    <div className={style.Btn}><Button clicked={onPreviewClick} button  >Preview</Button></div>
                    {btn}
            </div>
            {preview ?<div className={style.Preview}>
                <h4>Preview</h4>
                {parser.toReact(content)}
            </div>: null}
        </div>
        
    )
}


export default Post;
