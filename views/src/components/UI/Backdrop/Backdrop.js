import React from 'react';
import style from './Backdrop.module.css';

const Backdrop = (props) => {
    const {transparent} = props;
    let backgroundColor = ''
    if(transparent) backgroundColor = style.Transparent;
    return (
        <div className={[style.Backdrop, backgroundColor].join(' ')} onClick={props.clicked}>
        </div>
    )
}

export default Backdrop;
