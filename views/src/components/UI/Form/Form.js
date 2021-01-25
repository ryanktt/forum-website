import React from 'react';
import style from './Form.module.css';

const Form = (props) => {
    return (
        <div className={style.Form}>
            <form method={props.method} onSubmit={props.submited} action={props.action}>
                {props.children}
            </form>
        </div>
    )
}

export default Form;
