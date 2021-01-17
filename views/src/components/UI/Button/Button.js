import React from 'react';
import style from './Button.module.css';
import {Link} from 'react-router-dom';

const Button = (props) => {

    let buttonType = <div className={style.Button}><p>{props.children}</p></div>;
    if(props.buttonType) {
        buttonType = <div className={style.Button}><button  type='submit'><p>{props.children}</p></button></div>;
    }

    if(props.link) {
        buttonType = <Link to={props.link} className={style.Button}>{props.children}</Link>
    }



    return (
        <>
            {buttonType}
        </>
            
     
    )


}


export default Button;
