import React from 'react';
import style from './HamburgerToggle.module.css'

const HamburgerToggle = (props) => {
    return (
        <div className={style.HamburgerToggle} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default HamburgerToggle;
