import React, { useState } from 'react';
import { renderToString } from 'react-dom/server'
import style from './Post.module.css';
import Button from '../UI/Button/Button';
import {TextareaAutosize} from '@material-ui/core';
import parser from 'bbcode-to-react';

const Post = (props) => {
    const [content, setContent] = useState('')
    const {button} = props
    
    const onChange = () => {

    }

    let btn = null;
    if (button)  btn = <div className={style.Btn}><Button button intense>Postar</Button></div>

    return (
        <div className={style.NewPost}>
            <div className={style.BBbar}>
                <div className={style.BBItem}><i class="fas fa-bold"></i><div><p>Bold</p></div></div>
                <div className={style.BBItem}><i class="far fa-image"></i><div><p>Inserir Imagem</p></div></div>
                <div className={style.BBItem}><i class="fas fa-link"></i><div><p>Inserir Link</p></div></div>
                <div className={style.BBItem}><i class="far fa-smile-wink"></i><div><p>Emoji</p></div></div>
                {btn}
            </div>
            <div className={style.Content}><TextareaAutosize rowsMin={5} name='content' onChange={props.change} className={style.Textarea}/></div>
            <p>{parser.toReact('foo [quote="Loquiros"]bar[/quote]')}</p>
        </div>
        
    )
}

console.log(renderToString(<Post/>))

export default Post;
