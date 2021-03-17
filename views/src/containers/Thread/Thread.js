import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import style from './Thread.module.css';
import Post from './Post/Post';
import {fetchThread, newPost, reFetchPage, fetchPrivateThread} from '../../redux/actions/thread';
import {validationAlert} from '../../redux/actions/validationAlert';
import {setQuote, quoted} from '../../redux/actions/post';
import Location from '../../components/Location/Location';
import {categories} from '../../utils/categories';
import NewPost from '../../containers/NewPost/NewPost';
import Loading from '../../components/UI/Loading/Loading';
import PageLocation from '../../components/PageLocation/PageLocation';
import Button from '../../components/UI/Button/Button';



const Thread = (props) => {
    const {
        fetchThread, 
        thread, 
        fetching, 
        match, 
        reFetch, 
        setReFetch, 
        quote, 
        setQuote, 
        quoted, 
        makeNewPost, 
        setAlert, 
        isAuth, 
        fetchPrivateThread, 
        location, 
        history} = props;

    const isConversation = location.pathname === `/user/conversation/${match.params.id}`;
    const [posts, setPosts] = useState(null);
    const [newPost, setNewPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const currentPage = location.search;
    //check if it's fetching or if the thread has not been fetched before fetching again
  
    useEffect(() => {
        return () => {
          quoted();
        };
      }, []);

    useEffect(() => {
        if(isConversation && !thread ) {
            return fetchPrivateThread(match.params.id, currentPage);
        } 
        if(isConversation && reFetch ) {
            return fetchPrivateThread(match.params.id, currentPage);
        } 

        if(!thread && !fetching && !isConversation) {
            return fetchThread(match.params.id, currentPage);
        }
        if(reFetch && !fetching && !isConversation) {
            return fetchThread(match.params.id, currentPage);
        }
    
    }, [reFetch]);

    // useEffect(() => {
    //     if(thread) setThreadId(thread.id);
    // }, [thread])  

    const onSubmit = async (e, content) => {
        e.preventDefault();

        if(content === '') {
            return setAlert('Texto Vazio', 'danger');
        }
        let status = 'public'
        if(isConversation) status = 'private'
        await makeNewPost(content, match.params.id, status, match.params.category);
    
        setReFetch();
        quoted();
    }

    const onQuote = (content, postId, user) => {
        //remove inner quotes
        const quoteIndexStart = content.indexOf('[quote=');
        const quoteIndexEnd = content.indexOf('[/quote]') + 8;
        const firstPart = content.substr(0, quoteIndexStart);
        const lastPart = content.substr(quoteIndexEnd, content.length)
        if(quoteIndexStart !== -1) {
            content = `${firstPart}\n${lastPart}`;
        }
        
        const quotedMsg = `[quote=${user.name} member=${user.id}]${content}[/quote]`;
        setQuote({message: quotedMsg, toggler: !quote.toggler});
    }

    let postNumber = 0

    useEffect(() => { 
        if(isAuth) setNewPost(<div className={style.NewPost}><NewPost button submit={onSubmit}/></div>)

        if(thread) setPosts(thread.posts.map(post => {
            postNumber++
            return <div 
            className={style.Post} 
            key={post._id +1}>
                <Post 
                post={post} 
                user={post.user} 
                postNumber={postNumber} 
                quoted={onQuote}
                key={post._id}
                match={match}
                history={history}
                />
            </div>
        }));
        setLoading(false)
    }, [thread])

    const onReloadPage = () => {
        setReFetch();
    }

    //get category name by param
    const currentCategory = categories.filter(el => {
        return el.value === match.params.category
    });


    let categoryName = ''
    let categoryPath = ''
    
    let locationItems = [
        {name: 'Categorias', path: '/'},
        {name: categoryName, path: `/threads/${categoryPath}`}
    ]

    if(isConversation) {
        categoryName = 'Conversas';
        categoryPath = 'Conversation';

        locationItems = [
            {name: 'Categorias', path: '/'},
            {name: 'Conversas', path: '/user/conversations'}
        ]
    } else {
        categoryName = currentCategory[0].name;
        categoryPath = currentCategory[0].value;
        
        locationItems = [
            {name: 'Categorias', path: '/'},
            {name: categoryName, path: `/threads/${categoryPath}`}
        ]
    }
    const pageLocationPath = (category, pageNumber) => {
        if(thread.category === 'conversation') return `/user/conversation/${thread.id}?page=${pageNumber}`;
        return `/thread/${thread.category}/${thread.id}?page=${pageNumber}`;
    }

    let pagination = null
    if(thread) pagination = <div className={style.PageLocation}>
        <PageLocation path={pageLocationPath} {...thread.pagination} {...props}/>
        </div>
    return (
        loading ? <Loading/> 
        :<> 
            <h2 className={style.ThreadTitle}>{thread ? thread.title : null}</h2>
            <div className={style.LocationBar}>
                <Location items={locationItems}/>
                <div className={style.ReloadBtn}><Button medium clicked={onReloadPage} button><i className="fas fa-redo"></i></Button></div>
            </div>
            <div className={style.Thread}>
                {posts}
            </div>
            {pagination}
            <div>{newPost}</div>
            <div className={style.LocationBar} style={{marginTop: '30px'}}>
                <Location items={locationItems}/>
                <div className={style.ReloadBtn}><Button clicked={onReloadPage} medium button><i className="fas fa-redo"></i></Button></div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        thread: state.thread.thread,
        quote: state.post.quote,
        fetching: state.thread.fetching,
        reFetch: state.thread.reFetch,
        isAuth: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchThread: (threadId, page) => dispatch(fetchThread(threadId, page)),
        fetchPrivateThread: (threadId, page) => dispatch(fetchPrivateThread(threadId, page)),
        setQuote: (quote) => dispatch(setQuote(quote)),
        quoted: () => dispatch(quoted),
        makeNewPost: (content, threadId, status, category) => dispatch(newPost(content, threadId, status, category)),
        setReFetch: () => dispatch(reFetchPage),
        setAlert: (msg, type) => dispatch(validationAlert(msg, type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
