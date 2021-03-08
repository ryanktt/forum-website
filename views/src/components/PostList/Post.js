import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import style from './Post.module.css';
import FetchLink from '../FetchLink/FetchLink';
import {dateFormat} from '../../utils/dateFormat';
import {trimString} from '../../utils/textFormat';



const Post = (props) => {
    let {thread, user, post, match} = props;
    if(!user) user = post.user;

    let category = match.params.category;
    if(!match.params.category && thread) category = thread.category;

    return (
        (post && thread) ? <>
            <div className={style.PostItem}>

                <div className={[style.ProfilePic, style.Box].join(' ')}>
                    <Link to={`/member/${user._id}`}>
                        <img className={style.PostOwnerPic} src={user.profile.userImg} alt="user-img"/>
                    </Link>
                </div>

                <div className={[style.Post, style.Box].join(' ')}>
                    <div className={style.PostContent}>
                        <FetchLink  
                        classes={style.Link}
                        path={`/thread/${category}/${thread._id}`}>
                            <h4 className={style.Title}>{thread.title}</h4>
                        </FetchLink>
                        <i className={style.Content}>{trimString(post.content, 400)}</i>
                        <div className={style.PostDetails}>
                            <Link to={`/member/${user._id}`}><p className={style.Name}>{user.name}</p></Link>
                            <p>{dateFormat(post.createdAt)}</p>
                        </div>
                    </div>
            
                </div>
            </div>
            <hr className={style.Hr}/>
        </> : null 
    )
}

export default Post;
