import React from 'react'
import style from './Post.module.css';
import {dateFormat} from '../../../utils/dateFormat';

const Post = (props) => {
    const {post, user, postNumber} = props

    return (
        <div  className={style.Post}>
            <div className={style.UserDetails}>
                <img src={user.profile.userImg} alt='user-img'/>
                <div>
                     
                </div>
                <h4>{user.name}</h4>
                <div className={style.UserDetailsBox}>
                    <div>
                        <i class="far fa-user"></i>
                        <p>{dateFormat(user.createdAt)}</p>
                    </div>
                    <div>
                        <i class="far fa-comments"></i>
                        <p>13656</p>
                    </div>
                    <div>
                        <i class="far fa-thumbs-up"></i>
                        <p>{post.likes.length}</p>
                    </div>
                    <div>
                    <i class="far fa-thumbs-down"></i>
                        <p>{post.dislikes.length}</p>
                    </div>
                </div>
            </div>

            <div className={style.Content}>
                <div className={style.ContentBox}>
                    <div className={style.PostInf}>
                        <p>{dateFormat(post.createdAt)}</p>
                        <p>{`#${postNumber}`}</p>
                    </div>
                    <p className={style.ContentFont}>{post.content}</p>
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
                        <div className={style.Action}>
                            <i class="fas fa-reply"></i>
                            <p className={style.actionParagraph}>Responder</p>
                        </div>   
                    </div>
 
                </div>
            </div>

        </div>
    )
}

export default Post;
