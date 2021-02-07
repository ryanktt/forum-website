import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import style from './Threads.module.css';
import Thread from './Thread/Thread';
import Button from '../../components/UI/Button/Button';
import {fetchThreads, reFetchPage} from '../../redux/actions/thread';
import Location from '../../components/Location/Location';
import {categories} from '../../utils/categories';


const Threads = (props) => {
    let {fetchThreads, 
        reFetch,
        threads, 
        isAuth, 
        fetching, 
        match, 
        history
    } = props

    let newThreadBtn = null;

    if(isAuth) {
        newThreadBtn = <div className={style.ThreadsBtn}>
        <Button  link={`/user/new-thread?ctgry=${match.params.category}`} intense >Novo Tópico</Button>
        </div>
    }    

    //MAKE SO THAT THE THREADS ONLY FETCH ONCE (LOADING BUG)
    useEffect(() => {
        
        if(!threads && !fetching ) {
            return fetchThreads(match.params.category);
        }
      
        if(reFetch && !fetching) {
            return fetchThreads(match.params.category);
        }
        
    }, [])

     //get category name by param
     const currentCategory = categories.filter(el => {
        return el.value === props.match.params.category
    })

    if(!currentCategory[0]) {
        history.push('/') 
        return null
    }
    const categoryName = currentCategory[0].name;

    let threadList = []
    
    if(!fetching) if (threads) {
        threadList = threads.map(thread => {
            return <Thread {...props} thread={thread} key={thread._id} user={thread.user} />
        })
    }



    const locationItems = [
        {name: 'Categorias', path: '/'},
    ]
    



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
        </>
        
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuthenticated,
        threads: state.thread.threadList,
        fetching: state.thread.fetching,
        reFetch: state.thread.reFetch
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchThreads: (category) => dispatch(fetchThreads(category)),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Threads);
