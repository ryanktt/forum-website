import React from 'react'
import style from './Input.module.css';

const Input = (props) => {
    return (
        <div className={style.Input}>
            <label for={props.name}>{props.label}</label>
            <input type={props.type} name={props.name} id={props.name}/> 
        </div>
    )
}

export default Input;
