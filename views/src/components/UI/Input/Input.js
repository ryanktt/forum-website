import React from 'react'
import style from './Input.module.css';

const Input = (props) => {

    let label = '';
    if(props.label) label = <label for={props.name}>{props.label}</label>;
    return (
        <div className={style.Input}>
            {label}
            <input required onChange={props.change}  placeholder={props.placeholder} type={props.type} name={props.name} id={props.name}/> 
        </div>
    )
}

export default Input;
