import React from 'react'
import FetchLink from '../../../components/FetchLink/FetchLink';
import style from './Thread.module.css';
import {dateFormat} from '../../../utils/dateFormat';
import {categories as categoriesArr} from '../../../utils/categories';
import {Link} from 'react-router-dom';




const Thread = (props) => {
    const {thread, user, match, location} = props;
    const isConversation = location.pathname === '/user/conversations';
    
    const categories = categoriesArr.map(category => {
        if(!isConversation) if(match.params.category !== thread.category) {
            if(thread.category === category.value)  {
                //const brighter = changeRgbOpacity(category.color, 1)

                return <div key={category.value} style={{backgroundColor: category.color}} className={style.Category}>
                    <p >{category.name}</p>
                </div>
            }
        }
        return null;

    });
    
    //get last post createdAt from thread
    const postsArr = [...thread.posts];
    const lastPost = postsArr.pop(); 

    let category = match.params.category;
    if(!category) category = thread.category;

    let threadPath = `/thread/${category}/${thread._id}`;
    
    if(!match.params.category) category = thread.category;
    if(isConversation) {
        category = 'conversation'; 
        threadPath = `/user/${category}/${thread._id}`;
    }

    return (
        <>
        <div className={style.Thread}>

            <div className={[style.ProfilePic, style.Box].join(' ')}>
                <Link to={`/member/${user._id}`} >
                    <img className={style.ThreadOwnerPic} src={user.profile.userImg} alt="user-img"/>
                </Link>
            </div>

            <div className={[style.Post, style.Box].join(' ')}>
                <div className={style.PostContent}>
                <FetchLink  
                classes={style.Link}
                path={threadPath}>
                        <h4 className={style.Title}>{thread.title}</h4>
                </FetchLink>
                    <div className={style.PostDetails}>
                        <Link to={`/member/${user._id}`}><p className={style.Name}>{user.name}</p></Link>
                        <p>{dateFormat(thread.createdAt)}</p>
                    </div>
                </div>
                {categories}
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
                    <Link to={`/member/${lastPost.post.user._id}`}><p className={style.Name} style={{fontSize: '12px'}}>{lastPost.post.user.name}</p></Link>
                </div>
            </div>

            <div className={[style.ProfilePic2, style.Box].join(' ')}>
                <Link to={`/member/${lastPost.post.user._id}`}><img className={style.LastPostPic} alt="user-img" src={lastPost.post.user.profile.userImg}/></Link>
            </div>
        </div>
        <hr className={style.Hr}/>
        
        </>
    )
}

export default Thread;
