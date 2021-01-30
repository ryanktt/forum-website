import React from 'react';
import style from './Button.module.css';
import {Link} from 'react-router-dom';

const Button = (props) => {
    let buttonStyle = '';
    let buttonSize = '';
    let buttonColor = '';
    
    if(props.danger) buttonStyle = style.Danger;
    if(props.success) buttonStyle = style.Success;
    if(props.large) buttonSize = style.Large;
    if(props.intense) buttonColor = style.Intense;
   
    console.log(style)
    let buttonType = <Link to={props.link} onClick={props.close} className={[style.Button, buttonStyle, buttonSize, buttonColor].join(' ')}>{props.children}</Link>;
    if(props.button) {
        buttonType = <button type='submit'  to={props.link} onClick={props.clicked} className={[style.Button, buttonStyle, buttonSize, buttonColor].join(' ')}>{props.children}</button>
    }


    return (
        <>
            {buttonType}
        </>
            
     
    )


}


export default Button;
