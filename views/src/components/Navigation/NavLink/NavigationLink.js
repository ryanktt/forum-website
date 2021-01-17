import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './NavigationLink.module.css';


const NavigationLink = (props) => {
    return (
        <NavLink className={style.NavLink} exact to={props.link}>{props.children}</NavLink>
    )
}

export default NavigationLink;