import React from 'react'
import style from './Thread.module.css';
import Post from './Post/Post';

const Thread = () => {
    return (
        <div className={style.Thread}>
            <Post/>
            
        </div>
    )
}

export default Thread;
