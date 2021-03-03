import React from 'react';
import style from './Button.module.css';
import {Link} from 'react-router-dom';

const Button = (props) => {
    const {medium, small, danger, success, large, intense, link, clicked, children, button} = props;
    let {type} = props;

    let buttonStyle = '';
    let buttonSize = '';
    let buttonColor = '';
    
    if(medium) buttonSize = style.Medium
    if(small) buttonSize = style.Small;
    if(danger) buttonStyle = style.Danger;
    if(success) buttonStyle = style.Success;
    if(large) buttonSize = style.Large;
    if(intense) buttonColor = style.Intense;

    if(!type) type = 'button';    


    let buttonType = <Link to={link} onClick={clicked} className={[style.Button, buttonStyle, buttonSize, buttonColor].join(' ')}>{children}</Link>;
    if(button) {
        buttonType = <button type={type} onClick={clicked} className={[style.Button, buttonStyle, buttonSize, buttonColor].join(' ')}>{children}</button>
    }


    return (
        <>
            {buttonType}
        </>
            
     
    )


}


export default Button;
