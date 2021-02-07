import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import style from './Thread.module.css';
import Post from './Post/Post';
import {fetchThread} from '../../redux/actions/thread';
import Location from '../../components/Location/Location';
import Validation from '../../components/UI/Validation/ValidationMsgs';
import {categories} from '../../utils/categories';
import NewPost from '../../components/Post/Post';

const Thread = (props) => {
    const {fetchThread, thread, fetching, match, reFetch} = props;
    
    useEffect(() => {
        if(!thread && !fetching ) {
            return fetchThread(match.params.id);
        }
      
        if(reFetch && !fetching) {
            return fetchThread(match.params.id);
        }
        
    }, []);


    let posts = null;
    let postNumber = 0
    if(thread) posts = thread.posts.map(post => {
        postNumber++
        return <Post post={post} user={post.user} postNumber={postNumber} key={post._id}/>
    })


       //get category name by param
       const currentCategory = categories.filter(el => {
        return el.value === props.match.params.category
    })
    const categoryName = currentCategory[0].name;
    const categoryPath = currentCategory[0].value;


    const locationItems = [
        {name: 'Categorias', path: '/'},
        {name: categoryName, path: `/threads/${categoryPath}`}
    ]

    return (
        <>
        <div style={{margin:'0 auto'}}><Validation/></div>
        <h2 className={style.ThreadTitle}>{thread ? thread.title : null}</h2>
        <div className={style.Location}><Location items=
        {locationItems}/></div>
        <div className={style.Thread}>
            {posts}
        </div>
        <NewPost />
        
        </>
    )
}

const mapStateToProps = state => {
    return {
        thread: state.thread.thread,
        fetching: state.thread.fetching,
        reFetch: state.thread.reFetch
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchThread: (threadId) => dispatch(fetchThread(threadId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
