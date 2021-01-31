import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import style from './Threads.module.css';
import Thread from './Thread/Thread';
import Button from '../../components/UI/Button/Button';
import {fetchThreads} from '../../redux/actions/thread';

const Threads = (props) => {
    let newThreadBtn = null;
    if(props.isAuth) {
        newThreadBtn = <div className={style.ThreadsBtn}>
        <Button link='/user/new-thread' intense large>Novo Tópico</Button>
        </div>
    }    
    useEffect(() => {
        props.fetchThreads();
      }, []); 
    console.log('fetched')

    return (
        <>  
            {newThreadBtn}
            <div className={style.ThreadsCategory}>
                <p >Categoria</p>
            </div>
            <div className={style.Thread}>
                <Thread/>
                <Thread/>
                <Thread/>
                <Thread/>
                <Thread/>
                <Thread/>
                <Thread/>
                <Thread/>
            </div>
        </>
        
    )
}

const mapStateToPros = state => {
    return {
        isAuth: state.auth.isAuthenticated,
        threads: state.thread.threadList
    }
}

const mapDispatchToProps = dispatch => {
    return {fetchThreads: () => dispatch(fetchThreads)}
}
 
export default connect(mapStateToPros, mapDispatchToProps)(Threads);
