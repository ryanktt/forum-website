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

const Thread = (props) => {
    const {fetchThread, thread, fetching, match, reFetch, setReFetch, quote, setQuote, quoted, makeNewPost, setAlert, isAuth, fetchPrivateThread, location} = props;
    //const [threadId, setThreadId] = useState('');

    const isConversation = location.pathname === `/user/conversation/${match.params.id}`;
    //check if it's fetching or if the thread has not been fetched before fetching again
  
    useEffect(() => {
        if(isConversation && !thread ) {
            return fetchPrivateThread(match.params.id);
        } 
        if(isConversation && reFetch ) {
            return fetchPrivateThread(match.params.id);
        } 

        if(!thread && !fetching && !isConversation) {
            return fetchThread(match.params.id);
        }
        if(reFetch && !fetching && !isConversation) {
            return fetchThread(match.params.id);
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
        const quotedMsg = `[quote=${user.name}, post=${postId}]${content}[/quote]`;
        setQuote({message: quotedMsg, toggler: !quote.toggler});
    }


    let posts = null;
    let postNumber = 0
    if(thread) posts = thread.posts.map(post => {
        postNumber++
        return <div 
        className={style.Post} 
        key={post._id +1}>
            <Post 
            post={post} 
            user={post.user} 
            postNumber={postNumber} 
            quoted={onQuote}
            key={post._id}/>
        </div>
    })

    let newPost = null;
    if(isAuth) {
        newPost = <NewPost button submit={onSubmit}/>;
    }

    //get category name by param
    const currentCategory = categories.filter(el => {
        
        return el.value === match.params.category
    })


    let categoryName = ''
    let categoryPath = ''
    if(isConversation) {
        categoryName = 'Conversas';
        categoryPath = 'Conversation';
    } else {
        categoryName = currentCategory[0].name;
        categoryPath = currentCategory[0].value;
    }




    let locationItems = [
        {name: 'Categorias', path: '/'},
        {name: categoryName, path: `/threads/${categoryPath}`}
    ]
    if(isConversation) {
        locationItems = [
            {name: 'Categorias', path: '/'},
            {name: 'Conversas', path: '/user/conversations'}
        ]
    }


    return (
        <>
        <h2 className={style.ThreadTitle}>{thread ? thread.title : null}</h2>
        <div className={style.LocationBar}><Location items=
        {locationItems}/></div>
        <div className={style.Thread}>
            {posts}
        </div>
        {newPost}
        
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
        fetchThread: (threadId) => dispatch(fetchThread(threadId)),
        fetchPrivateThread: (threadId) => dispatch(fetchPrivateThread(threadId)),
        setQuote: (quote) => dispatch(setQuote(quote)),
        quoted: () => dispatch(quoted),
        makeNewPost: (content, threadId, status, category) => dispatch(newPost(content, threadId, status, category)),
        setReFetch: () => dispatch(reFetchPage),
        setAlert: (msg, type) => dispatch(validationAlert(msg, type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
