import React from 'react'
import style from './Post.module.css';
import {dateFormat} from '../../../utils/dateFormat';
import parser from 'bbcode-to-react';

const Post = (props) => {
    const {post, user, postNumber, quoted} = props;

    const parsedContent = parser.toReact(post.content)
    const username = user.name;
    const createdAt = user.createdAt;
    const postLikes = post.likes.length;
    const postDislikes = post.dislikes.length;



    return (
        <div  className={style.Post}>
            <div className={style.UserDetails}>
                <img src={user.profile.userImg} alt='user-img'/>
                <h4>{username}</h4>
                <div className={style.UserDetailsBox}>
                    <div>
                        <i class="far fa-user"></i>
                        <p>{dateFormat(createdAt)}</p>
                    </div>
                    <div>
                        <i class="far fa-comments"></i>
                        <p>13656</p>
                    </div>
                    <div>
                        <i class="far fa-thumbs-up"></i>
                        <p>{postLikes}</p>
                    </div>
                    <div>
                        <i class="far fa-thumbs-down"></i>
                        <p>{postDislikes}</p>
                    </div>
                </div>
            </div>

            <div className={style.Content}>
                <div className={style.ContentBox}>
                    <div className={style.PostInf}>
                        <p>{dateFormat(post.createdAt)}</p>
                        <p>{`#${postNumber}`}</p>
                    </div>
                    <p style={{whiteSpace: 'pre-line'}} >{parsedContent}</p>
                </div>
                
                <div className={style.UserActions}>              
                    <div className={style.Action}>
                        <i class="fas fa-exclamation-circle"></i>
                        <p>Reportar</p>
                    </div>

                    <div className={style.Actions}> 
                        <div className={style.Action}>
                            <i class="far fa-thumbs-up"></i>
                            <p className={style.actionParagraph}>Like</p>
                        </div>
                        <div className={style.Action}>
                            <i class="far fa-thumbs-down"></i>
                            <p className={style.actionParagraph}>Dislike</p>
                        </div>
                        <a href='#new-post' onClick={() => quoted(post.content, post._id, {name: user.name, id: user._id})} style={{textDecoration: 'none'}}>
                            <div className={style.Action} >
                                <i class="fas fa-reply"></i>
                                <p className={style.actionParagraph}>Responder</p>
                            </div>   
                        </a>
                    </div>
 
                </div>
            </div>

        </div>
    )
}

export default Post;
