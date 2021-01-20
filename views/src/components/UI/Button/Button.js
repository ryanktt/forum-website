import React from 'react';
import style from './Button.module.css';
import {Link} from 'react-router-dom';

const Button = (props) => {
    let buttonStyle = ''
    if(props.danger) buttonStyle = style.Danger;
    if(props.Success) buttonStyle = style.Succes;
    let buttonType = <Link to={props.link} onClick={props.close} className={[style.Button, buttonStyle].join(' ')}>{props.children}</Link>;
    if(props.button) {
        buttonType = <button  to={props.link} onClick={props.clicked} className={[style.Button, buttonStyle].join(' ')}>{props.children}</button>
    }


    return (
        <>
            {buttonType}
        </>
            
     
    )


}


export default Button;
