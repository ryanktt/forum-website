import React from 'react';
import style from './Backdrop.module.css';

const Backdrop = (props) => {
    return (
        <div className={style.Backdrop} onClick={props.clicked}>
        </div>
    )
}

export default Backdrop;
