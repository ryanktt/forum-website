import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import style from './Post.module.css';
import axios from '../../../utils/axios';
import {dateFormat} from '../../../utils/dateFormat';
import parser from 'bbcode-to-react';
import {reFetchPage} from '../../../redux/actions/thread';
import ThreadModal from '../../Modals/ThreadModal/ThreadModal';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';

const Post = (props) => {
    const {post, user, postNumber, quoted, reFetch, clientUser, isAuth, match, history} = props;
    const [isAdmin, setIsAdmin] = useState(false)
     

    const [adminModalActive, setAdminModalActive] = useState(false);
    const [reaction, setReaction] = useState({
        like: false,
        dislike: false
    });
    const [reactionStyle, setReactionStyle] = useState({
        like: [style.Action],
        dislike: [style.Action]
    });
    const [reactionAction, setReactionAction] = useState({
        like: 'like',
        dislike: 'dislike'
    });

    const adminActionsToggle = () => {
        setAdminModalActive(!adminModalActive);
    }

    useEffect(() => {
        if (isAuth) setIsAdmin(clientUser.settings.role === 2)
    }, [isAuth])

    useEffect(() => {
        if(isAuth) {
            if (post.likes.some((like) => like.user.toString() === clientUser._id)) {
                return setReaction({like: true, dislike: false});
            }
            if (post.dislikes.some((dislike) => dislike.user.toString() === clientUser._id)) {
                return setReaction({like: false, dislike: true});
            }
            setReaction({like: false, dislike: false})
        }
    }, [post.dislikes, post.likes]);
    
    useEffect(() => {
        if(isAuth) {
            if(reaction.like) {
                setReactionAction({dislike: 'dislike', like: 'unlike'})
                setReactionStyle({like: [style.Action, style.Active], dislike: [style.Action]});
                return;
            };
            if(reaction.dislike) {
                setReactionAction({like: 'like', dislike: 'undo-dislike'})
                setReactionStyle({dislike: [style.Action, style.Active], like: [style.Action]});
                return;
            };
            setReactionAction({like: 'like', dislike: 'dislike'})
            setReactionStyle({dislike: [style.Action], like: [style.Action]});
        }
    }, [reaction]);

    const parsedContent = parser.toReact(post.content).map(content => {
        if (typeof content === 'string') return <p>{content}</p>
        return content
        
    });
 
    const threadId = match.params.id
    const username = user.name;
    const createdAt = user.createdAt;
    const postLikes = user.profile.likes;
    const postDislikes = user.profile.dislikes;
    const postCount = user.profile.postCount;


    const postActions = async (postId, action) => {
        let request = null;
        switch(action) {
            case 'like':
            case 'dislike':
            case 'unlike':
            case 'undo-dislike': {
                request = () => axios.put(`/user/${action}/${postId}`);
                break
            }
            default: break;       
        }
        try {
     
            await request();
            reFetch();
        } catch (err) {
            console.error(err);
        }
    }

    let actions = null;
    if(isAuth) actions = (
        <div className={style.UserActions}>            
            <div className={style.Action} onClick={adminActionsToggle}>
                {isAdmin ? <>
                <i className="fas fa-cog"></i>
                <p>Admin</p> 
                </>: <>
                <i className="fas fa-exclamation-circle"></i>
                <p>Reportar</p></> }
            </div>

            <div className={style.Actions}> 
                <div onClick={() => postActions(post._id, reactionAction.like)} className={reactionStyle.like.join(' ')}>
                    <i className="far fa-thumbs-up"></i>
                    <p className={style.actionParagraph}>Like</p>
                </div>
                <div onClick={() => postActions(post._id, reactionAction.dislike)} className={reactionStyle.dislike.join(' ')}>
                    <i className="far fa-thumbs-down"></i>
                    <p className={style.actionParagraph}>Dislike</p>
                </div>
                <a href='#quote' onClick={() => quoted(post.content, post._id, {name: user.name, id: user._id})} style={{textDecoration: 'none'}}>
                    <div className={style.Action} >
                        <i className="fas fa-reply"></i>
                        <p className={style.actionParagraph}>Responder</p>
                    </div>   
                </a>
            </div>
        </div>
    )
    
    return (
        <div  className={style.Post}>
            {adminModalActive ? <Backdrop clicked={adminActionsToggle}/> : null}
            <ThreadModal 
                active={adminModalActive} 
                close={adminActionsToggle} 
                postId={post._id}  
                threadId={post.thread} 
                postNumber={postNumber}
                {...props}/>

            <div className={style.UserDetails}>
                <img src={user.profile.userImg} alt='user-img'/>
                <h4>{username}</h4>
                <div className={style.UserDetailsBox}>
                    <div>
                        <i className="far fa-user"></i>
                        <p>{dateFormat(createdAt)}</p>
                    </div>
                    <div>
                        <i className="far fa-comments"></i>
                        <p>{postCount}</p>
                    </div>
                    <div>
                        <i className="far fa-thumbs-up"></i>
                        <p>{postLikes}</p>
                    </div>
                    <div>
                        <i className="far fa-thumbs-down"></i>
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
                    <div className={style.ContentArea}>
                        {parsedContent}
                    </div>
                    
                </div>
                
                {actions}
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        clientUser: state.auth.user,
        isAuth: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reFetch: () => dispatch(reFetchPage)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Post);
