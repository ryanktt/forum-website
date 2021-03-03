import React from 'react'
import style from './Input.module.css';
import {TextareaAutosize} from '@material-ui/core';

const Input = (props) => {
    const {required, change, placeholder, type, name, textarea, label, value} = props;
    

    let input = <input required={required} onChange={(e) => change(e)} value={value} placeholder={placeholder} type={type} name={name} id={name}/> 
    if(textarea) input = <TextareaAutosize rowsMin={3} value={value} name='description' id='description' className={style.Textarea} onChange={(e) => change(e)}/>

    let labelJSX = null;
    if(label) labelJSX = <label for={name}>{label}</label>;
    return (
        <div className={style.Input}>
            {labelJSX}
            {input}
        </div>
        
    )
}

export default Input;
