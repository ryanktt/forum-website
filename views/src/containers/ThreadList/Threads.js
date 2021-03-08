import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux';
import style from './Threads.module.css';
import Thread from './Thread/Thread';
import Button from '../../components/UI/Button/Button';
import {fetchThreads, fetchPrivateThreads, reFetchPage, setPath} from '../../redux/actions/thread';
import Location from '../../components/Location/Location';
import {categories} from '../../utils/categories';
import PageLocation from '../../components/PageLocation/PageLocation';


const Threads = (props) => {
    let {fetchThreads, 
        reFetch,
        threads, 
        isAuth, 
        fetching, 
        match, 
        history,
        paginate,
        location,
        fetchPrivateThreads,
        setReFetch, 
        setPath, 
        path
    } = props
    
    const isConversation = location.pathname === '/user/conversations';

    const category = match.params.category;
    const currentPage = location.search;
    const currentPath = location.pathname;
    let newThreadBtn = null;

    let btnText = 'Novo Tópico';
    let link = `/user/new-thread?ctgry=${category}`;

    if(isConversation) {
        btnText = 'Iniciar Conversa';
        link = '/user/new-conversation';
    }

    if(isAuth) {
        newThreadBtn = <div className={style.ThreadsBtn}>
        <Button  link={link}  >{btnText}</Button>
        </div>
    }    

    //MAKE SO THAT THE THREADS ONLY FETCH ONCE (LOADING BUG)
    useEffect(() => {
        setPath(currentPath)
  
        if(isAuth) if(isConversation && !threads && !fetching  
            || reFetch && isConversation && !fetching ) {
            return fetchPrivateThreads(currentPage);


        }
        const param = {category: category, currentPage: currentPage}
        if(!threads && !fetching && !isConversation) {
            return fetchThreads(param);
        }
      
        if(reFetch && !fetching && !isConversation) {
            return fetchThreads(param);
        }
        
    }, [reFetch])

    useEffect(() => {
        if(isAuth) if(isConversation && !threads  
            || reFetch && isConversation ) {
            return fetchPrivateThreads(currentPage);

        }
    }, [isAuth])

    useEffect(() => {
       if(currentPath !== path) {
           setReFetch();
       }
    }, [currentPath])

    //get category name by param
    const currentCategory = categories.filter(el => {
        return el.value === category
    })

    if(!isConversation) if(!currentCategory[0]) {
        history.push('/');
        return null;
    }
    let categoryName = null;
    isConversation ? categoryName = 'Mensagens Privadas': categoryName = currentCategory[0].name;

    let threadList = [];
    
    if(!fetching) if (threads) {
        threadList = threads.map(thread => {
            return <Thread {...props} setReFetch={setReFetch} thread={thread} key={thread._id} user={thread.user} />
        })
    }



    let locationItems = [
        {name: 'Categorias', path: '/'},
    ]

    
    const pageLocationPath = (category, pageNumber) => {
        return `/threads/${category}?page=${pageNumber}`
    }

    //



    return (
        <>  
        <div className={style.BtnMobile}>{newThreadBtn}</div>
            <div className={style.LocationBar}>
                <Location items={locationItems} />
                <div  className={style.Btn}>{newThreadBtn}</div>
            </div>
            
            <div className={style.ThreadsCategory}>
                <p >{categoryName}</p>
            </div>
            <div className={style.Thread}>
            {threadList}
            </div>
            <div className={style.PageLocation}><PageLocation  path={pageLocationPath} history={history} category={category} {...paginate}/></div>
        </>
        
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuthenticated,
        threads: state.thread.threadList,
        fetching: state.thread.fetching,
        reFetch: state.thread.reFetch,
        paginate: state.thread.threadsPagination,
        path: state.thread.path
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setReFetch: () => dispatch(reFetchPage),
        fetchThreads: (category) => dispatch(fetchThreads(category)),
        fetchPrivateThreads: (page) => dispatch(fetchPrivateThreads(page)),
        setPath: (path) => dispatch(setPath(path))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Threads);
