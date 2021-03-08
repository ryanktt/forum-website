import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import style from './Search.module.css';
import Post from '../../../components/PostList/Post';
import Searchbar from '../../../components/Navigation/Searchbar/Searchbar';
import PageLocation from '../../../components/PageLocation/PageLocation';
import {search} from '../../../redux/actions/user';

const Search = (props) => {
    const {posts, match, history, search, location} = props;
    const [postList, setPostList] = useState(null);
    const currentPage = location.search;
    
    useEffect(() => {
        if(posts) {
            setPostList(posts.data.map(post => {
                return <Post post={post} key={post.id} thread={post.thread} match={match} />
            }));
        }

    }, [posts]);

    useEffect(() => {
        if(posts) if (location.search !== '')search(posts.text, currentPage)
    }, [location.search]);

    const pageLocationPath = (category, pageNumber) => {
        return `/user/search?page=${pageNumber}`;
    }

    let postsSection = null
    if(posts) postsSection = (
        <>
            <h4>Resultados da pesquisa por: {posts.text}</h4>
            {postList}
            <div className={style.PageLocation}><PageLocation path={pageLocationPath} history={history} {...posts.pagination}/></div>
        </>
    )

    return (
        <div className={style.Search}>
        <div className={style.Searchbar}><Searchbar /></div>
        {postsSection}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        posts: state.user.search
    }
}

const mapDispatchToProps = dispatch => {
    return {
        search: (text, page) => dispatch(search(text, page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
