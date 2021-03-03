import React from 'react';
import style from './Dropdown.module.css';

const Dropdown = (props) => {
    let {change, required, placeholder, options, value} = props
    if (!required) required = false;

    return (
        <div className={style.Dropdown}>
            <select onChange={change} required={required} name='category'>
        <option  selected disabled >{placeholder}</option>
            
            {
                options.map(option => {
                    if(option.value === value) {
                        return <option key={option.value} selected value={option.value}>{option.name}</option>
                    }
                    return <option key={option.value} value={option.value}>{option.name}</option>
                })
            }
            </select>
        </div>
    )
}

export default Dropdown;
