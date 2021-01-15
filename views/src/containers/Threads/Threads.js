import React from 'react'
import style from './Threads.module.css';
import Thread from './Thread/Thread';

const Threads = () => {
    return (
        <>
            <div className={style.ThreadCategory}>
                <p>Categoria</p>
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

export default Threads;
