import React from 'react'
import style from './Thread.module.css';
import {dateFormat} from '../../../utils/dateFormat';

const Thread = (props) => {
    const {thread, user} = props;

    //get last post createdAt from thread
    const postsArr = [...thread.posts];
    const lastPost = postsArr.shift()


    return (
        <>
        <div className={style.Thread}>

            <div className={[style.ProfilePic, style.Box].join(' ')}>
                <img className={style.ThreadOwnerPic} src={user.profile.userImg} alt="user-img"/>
            </div>

            <div className={[style.Post, style.Box].join(' ')}>
                <div className={style.PostContent}>
                    <h4>{thread.title}</h4>
                    <div className={style.PostDetails}>
                        <p>{user.name}</p>
                        <p>{dateFormat(thread.createdAt)}</p>
                    </div>
                </div>
            </div>

            <div className={[style.Details, style.Box].join(' ')}>
                <div className={style.DetailsBox}>
                    <div>
                        <p>Replies:</p> 
                        <p>{thread.posts.length - 1}</p>
                    </div>
                    <div>
                        <p>Views:</p>
                        <p>{thread.views}</p>
                    </div>        
                </div>
            </div>

            <div className={style.DetailsMobile}>
                <div className={style.DetailsMobileBox}>
                    <i class="fas fa-comment-alt"></i>
                    <p>{thread.posts.length - 1}</p>
                </div>
            </div>

            <div className={[style.LastPost, style.Box].join(' ')}>
                <div>
                    <p style={{fontSize: '12px'}}>{dateFormat(lastPost.post.createdAt)}</p>
                    <p style={{fontSize: '12px'}}>{lastPost.post.user.name}</p>
                </div>
            </div>

            <div className={[style.ProfilePic2, style.Box].join(' ')}>
                <img className={style.LastPostPic} alt="user-img" src={lastPost.post.user.profile.userImg}/>
            </div>
        </div>
        <hr className={style.Hr}/>
        
        </>
    )
}

export default Thread;
