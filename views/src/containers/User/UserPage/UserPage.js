import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import style from './UserPage.module.css';
import Button from '../../../components/UI/Button/Button';
import {fetchUser, fetchPosts, fetchThreads, reset} from '../../../redux/actions/user';
import {dateFormat} from '../../../utils/dateFormat';
import Thread from '../../ThreadList/Thread/Thread';
import PageLocation from '../../../components/PageLocation/PageLocation';
import Location from '../../../components/Location/Location';


const UserPage = (props) => {
    const {fetchUser, fetchThreads, fetchPosts, user, threads, posts, match, reset, history, location} = props;
    const [threadList, setThreadList] = useState(null);
    const [load, setLoad] = useState(true)
    
    const currentPage = location.search;
    const userId = match.params.id;
    const param = {userId: userId, currentPage: currentPage}

    useEffect(() => {
        fetchUser(userId);
       
    }, [userId]);

    useEffect(() => {
        if (threads) {
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
        if(threads && !load) fetchThreads(param)
    }, [currentPage])


    


    const onClickTopics =  () => {
        fetchThreads(param);
        setLoad(false)

    }

    const onClickPosts = () => {
        fetchPosts(userId);
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

    return (
        <>
        <div className={style.LocationBar}>
            <Location items={routeLocationItems}/>
        </div>
            {user ? 
            <div className={style.UserPage}>
                <div className={style.UserPageBox}>
                    <div className={style.Img}>
                        <img alt='user-img' src={user.profile.userImg}/>
                    </div>
                    <div className={style.UserContent}>
                        <h3>{user.name}</h3>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div className={style.UserStatistics}>
                                <h5>Postagens</h5><p>{user.postCount}</p></div>
                            <div className={style.UserStatistics}>
                                <h5>Likes</h5><p>{user.profile.likes}</p></div>
                            <div className={style.UserStatistics}>
                                <h5>Dislikes</h5><p>{user.profile.dislikes}</p></div>
                            <div className={style.UserStatistics}>
                                <h5>Tópicos</h5><p>{user.threadCount}</p></div>
                        </div>
                        <hr style={{border: '1px solid grey', borderBottom: '0'}} />
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div className={style.UserStatistics} >
                                <h5>Cadastro</h5>
                                <p>{dateFormat(user.createdAt)}</p>
                            </div>
                            <div style={{display: 'flex', alignItems: 'end'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', width: '220px'}}>
                                    <Button button clicked={onClickTopics} intense small>Tópicos</Button>
                                    <Button button intense clicked={onClickPosts} small>Posts</Button>
                                    <Button button intense small>Mensagem Privada</Button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
                <div></div>
            </div>
            : <h2 style={{color: 'rgb(29,29,29)', marginLeft: '25px'}}>Usuário não Encontrado :(</h2>}
            <div>
                {threadsSection}
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.data,
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
