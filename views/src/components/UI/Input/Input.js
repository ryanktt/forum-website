import React from 'react'
import style from './Input.module.css';

const Input = (props) => {

    let input = <input required={props.required} onChange={(e) => props.change(e)}  placeholder={props.placeholder} type={props.type} name={props.name} id={props.name}/> 

    if(props.value) {
        input = <input required={props.required} onChange={(e) => props.change(e)} value={props.value} placeholder={props.placeholder} type={props.type} name={props.name} id={props.name}/> 
    }

    let label = '';
    if(props.label) label = <label for={props.name}>{props.label}</label>;
    return (
        <div className={style.Input}>
            {label}
            {input}
        </div>
    )
}

export default Input;
