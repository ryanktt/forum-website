import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux';
import style from './Threads.module.css';
import Thread from './Thread/Thread';
import Button from '../../components/UI/Button/Button';
import {fetchThreads} from '../../redux/actions/thread';


const Threads = (props) => {
    const [threadsFetched, setThreadsFetched] = useState(false);
    let {fetchThreads, threads, isAuth} = props

    let newThreadBtn = null;
    if(isAuth) {
        newThreadBtn = <div className={style.ThreadsBtn}>
        <Button link='/user/new-thread' intense large>Novo Tópico</Button>
        </div>
    }    

    useEffect(() => {
        fetchThreads();
    }, []) 

    useEffect(() => {
        if(threads.length > 0) {
            setThreadsFetched(true)
        }
    }, [threads])

    let threadList = []
    
    if(threadsFetched){
        threadList = threads.map(thread => {
            return <Thread thread={thread} key={thread._id} user={thread.user} />
        })
    }
    
    return (
        <>  
            {newThreadBtn}
            <div className={style.ThreadsCategory}>
                <p >Categoria</p>
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
        threads: state.thread.threadList
    }
}

const mapDispatchToProps = dispatch => {
    return {fetchThreads: () => dispatch(fetchThreads)}
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Threads);
