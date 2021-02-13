import React from 'react';

import style from './Post.module.css';
import Button from '../UI/Button/Button';
import {TextareaAutosize} from '@material-ui/core';


const Post = (props) => {
    const {button, change, select} = props;

    let btn = null;
    if (button)  btn = <div className={style.Btn}><Button button intense>Postar</Button></div>


    return (
        <div id='new-post' className={style.NewPost}>
            <div className={style.BBbar}>
                <div className={style.BBItem}><i class="fas fa-bold"></i><div><p>Bold</p></div></div>
                <div className={style.BBItem}><i class="fas fa-italic"></i><div><p>Itálico</p></div></div>
                <div className={style.BBItem}><i class="far fa-image"></i><div><p>Inserir Imagem</p></div></div>
                <div className={style.BBItem}><i class="fas fa-link"></i><div><p>Inserir Link</p></div></div>
                <div className={style.BBItem}><i class="far fa-smile-wink"></i><div><p>Emoji</p></div></div>
                {btn}
            </div>
            <div className={style.Content}>
                <TextareaAutosize 
                rowsMin={5} 
                value={props.content} 
                name='content' 
                onChange={(e) => change(e)} className={style.Textarea}
                onSelect={(e) => select(e)}/>
            </div>
        </div>
        
    )
}


export default Post;
