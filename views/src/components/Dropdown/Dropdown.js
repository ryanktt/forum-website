import React from 'react';
import style from './Dropdown.module.css';

const Dropdown = (props) => {
    let {change, required, placeholder, options} = props
    if (!required) required = false;

    return (
        <div className={style.Dropdown}>
            <select onChange={change} required={required} name='category'>
            <option  disabled selected>{placeholder}</option>
            {
                options.map(option => {
                    return <option key={option.value} value={option.value}>{option.name}</option>
                })
            }
            </select>
        </div>
    )
}

export default Dropdown;
