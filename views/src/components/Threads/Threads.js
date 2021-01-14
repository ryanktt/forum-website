import React from 'react'
import style from './Threads.module.css';
import Thread from './Thread/Thread';

const Threads = () => {
    return (
        <div className={style.Thread}>
            <Thread/>
        </div>
        
    )
}

export default Threads;
