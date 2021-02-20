import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import style from './Post.module.css';
import axios from '../../../utils/axios';
import {dateFormat} from '../../../utils/dateFormat';
import parser from 'bbcode-to-react';
import {reFetchPage} from '../../../redux/actions/thread';

const Post = (props) => {
    const {post, user, postNumber, quoted, reFetch, clientUser} = props;
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

    useEffect(() => {
        if (post.likes.some((like) => like.user.toString() === clientUser._id)) {
            return setReaction({like: true, dislike: false});
        }
        if (post.dislikes.some((dislike) => dislike.user.toString() === clientUser._id)) {
            return setReaction({like: false, dislike: true});
        }
        setReaction({like: false, dislike: false})
    }, [post.dislikes, post.likes]);
    
    useEffect(() => {
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

    }, [reaction]);


    const parsedContent = parser.toReact(post.content)
    const username = user.name;
    const createdAt = user.createdAt;
    const postLikes = user.profile.likes;
    const postDislikes = user.profile.dislikes;


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
            case 'delete': {
                request = () => axios.delete(`user/post/${postId}`);
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
                        <div onClick={() => postActions(post._id, reactionAction.like)} className={reactionStyle.like.join(' ')}>
                            <i class="far fa-thumbs-up"></i>
                            <p className={style.actionParagraph}>Like</p>
                        </div>
                        <div onClick={() => postActions(post._id, reactionAction.dislike)} className={reactionStyle.dislike.join(' ')}>
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

const mapStateToProps = state => {
    return {
        clientUser: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reFetch: () => dispatch(reFetchPage)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Post);
