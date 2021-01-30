import React from 'react'
import {connect} from 'react-redux';
import style from './Threads.module.css';
import Thread from './Thread/Thread';
import Button from '../../components/UI/Button/Button';

const Threads = (props) => {
    let newThreadBtn = null;
    if(props.isAuth) {
        newThreadBtn = <div className={style.ThreadsBtn}>
        <Button link='/user/new-thread' intense large>Novo Tópico</Button>
        </div>
    }    

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
    console.log(state)
    return {
        isAuth: state.auth.isAuthenticated
    }
}
 
export default connect(mapStateToPros)(Threads);
