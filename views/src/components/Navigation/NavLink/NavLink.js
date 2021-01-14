import React from 'react';
import style from './NavLink.module.css';

const NavLink = (props) => {
    return (
        <div className={style.NavLink}><a href="/">{props.children}</a></div>
    )
}

export default NavLink;