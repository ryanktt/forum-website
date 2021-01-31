import React from 'react';
import style from './Post.module.css';

const Post = (props) => {
    return (
        <div>
            <textarea required name='content' onChange={props.change}/>
        </div>
    )
}

export default Post;
