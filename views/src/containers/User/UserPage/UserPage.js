import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import style from './UserPage.module.css';

import Button from '../../../components/UI/Button/Button';
import {fetchUser, fetchPosts, fetchThreads, reset} from '../../../redux/actions/user';
import {dateFormat} from '../../../utils/dateFormat';
import Thread from '../../ThreadList/Thread/Thread';
import PageLocation from '../../../components/PageLocation/PageLocation';
import Location from '../../../components/Location/Location';
import Post from '../../../components/PostList/Post';
import UserModal from '../../Modals/UserModal/UserModal';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import ValidationMsgs from '../../../components/UI/Validation/ValidationMsgs';



const UserPage = (props) => {
    const {fetchUser, fetchThreads, fetchPosts, user, threads, posts, match, reset, history, location, isAuth, clientUser} = props;
    const [threadList, setThreadList] = useState(null);
    const [postList, setPostList] = useState(null);
    const [load, setLoad] = useState(true); //prevent posts or threads from loading before user asks for it
    
    const currentPage = location.search;
    const userId = match.params.id;
    const threadParam = {userId: userId, currentPage: currentPage}
    const postParam = {userId: userId, currentPage: currentPage}
    
    useEffect(() => {
        fetchUser(userId);
       
    }, [userId]);

    useEffect(() => {
        if (threads || posts) {
            reset('threads');
            reset('posts')
            setLoad(true);
        }
        
    }, []);


    useEffect(() => {
        if(threads) {
            setThreadList(threads.data.map(thread => {
                return <Thread  {...props} thread={thread} key={thread._id} user={user} />
            }));
        }
    }, [threads]);

    useEffect(() => {
        if(posts) {
            setPostList(posts.data.map(post => {
                return <Post post={post} thread={post.thread} user={user} match={match} />
            }));
        }
    }, [posts]);


    useEffect(() => {
        if(threads && !load) fetchThreads(threadParam)
    }, [currentPage]);


    const onClickTopics =  () => {
        reset('posts');
        fetchThreads(threadParam);
        setLoad(false) 

    }

    const onClickPosts = () => {
        reset('threads');
        fetchPosts(postParam);
        setLoad(false) 
    }

    const onClickPrivateMessage = () => {
        history.push(`/user/new-conversation?with=${user.name}`)
    }

    const pageLocationPath = (category, pageNumber) => {
        return `/member/${userId}?page=${pageNumber}`
    }

    const routeLocationItems = [
        {name: 'Categorias', path: '/'},
    ]

    let threadsSection = null
    if(threads) threadsSection = (
            <>
                {threadList}
                <div className={style.PageLocation}><PageLocation path={pageLocationPath} history={history} {...threads.pagination}/></div>
            </>
    )
        
    let postsSection = null
    if(posts) postsSection = (
            <>
                {postList}
                <div className={style.PageLocation}><PageLocation path={pageLocationPath} history={history} {...posts.pagination}/></div>
            </>
    )
    let pmButton = null
    if(isAuth && clientUser._id !== userId) pmButton = <Button button clicked={onClickPrivateMessage} intense small>Mensagem Privada</Button>

    //Admin
    const [adminModalActive, setAdminModalActive] = useState(false);

    const adminActionsToggle = () => {
        setAdminModalActive(!adminModalActive);
    }

    
    return (
        <>
        <div className={style.LocationBar}>
            <Location items={routeLocationItems}/>
        </div>
            {user ? 
            <>
            <ValidationMsgs/>
            {adminModalActive ? <Backdrop clicked={adminActionsToggle}/> : null}
            <UserModal active={adminModalActive} close={adminActionsToggle} userId={user._id}/>
            
            <div className={style.UserPage}>
                <div className={style.UserPageBox}>
                    <div className={style.AdminBtn}><Button clicked={adminActionsToggle} small intense button >Admin</Button></div>
                    <div className={style.Img}>
                        <img alt='user-img' src={user.profile.userImg}/>
                    </div>
                    <div className={style.UserContent}>
                        <h3>{user.name}</h3>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div className={style.UserStatistics}>
                                <h5>Postagens</h5><p>{user.profile.postCount}</p></div>
                            <div className={style.UserStatistics}>
                                <h5>Likes</h5><p>{user.profile.likes}</p></div>
                            <div className={style.UserStatistics}>
                                <h5>Dislikes</h5><p>{user.profile.dislikes}</p></div>
                            <div className={style.UserStatistics}>
                                <h5>Tópicos</h5><p>{user.profile.threadCount}</p></div>
                        </div>
                        <hr style={{border: '1px solid grey', borderBottom: '0'}} />
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div className={style.UserStatistics} >
                                <h5>Cadastro</h5>
                                <p>{dateFormat(user.createdAt)}</p>
                            </div>
                            <div style={{position: 'relative'}}>
                                <div className={style.ButtonsBox}>
                                    <Button button clicked={onClickTopics} intense small>Tópicos</Button>
                                    <Button button intense clicked={onClickPosts} small>Posts</Button>
                                    {pmButton}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
                <div></div>
            </div>
            </>
            : <h2 style={{color: 'rgb(29,29,29)', marginLeft: '25px'}}>Usuário não Encontrado :(</h2>}
            <div style={{marginTop: '15px'}} >
                {threadsSection}
                {postsSection}
            </div>
            
        </>
     )
}   

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuthenticated,
        user: state.user.data,
        clientUser: state.auth.user,
        threads: state.user.threads,
        posts: state.user.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: (userId) => dispatch(fetchUser(userId)),
        fetchPosts: (userId) => dispatch(fetchPosts(userId)),
        fetchThreads: (userId) => dispatch(fetchThreads(userId)),
        reset: (type) => dispatch(reset(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
