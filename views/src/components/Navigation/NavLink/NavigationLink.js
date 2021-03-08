import React from 'react';
import FetchLink from '../../FetchLink/FetchLink';
import style from './NavigationLink.module.css';


const NavigationLink = (props) => {
    let {active} = props;
    let classesNavLInk = [style.NavLink];
    let classesNavBox = [style.NavBox]
    
    if(active) {
        classesNavLInk = [style.NavLink, style.Active].join(' ')
        classesNavBox = [style.NavBox, style.Active].join(' ')
    }

    return (
        <FetchLink style={{textDecoration:'none', margin: '10px 0'}} exact path={props.link}>
            <div className={classesNavBox}><h4 className={classesNavLInk}>{props.children}</h4></div>
        </FetchLink>
    )
}

export default NavigationLink;