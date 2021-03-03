import React, {useEffect, useState} from 'react';
import Button from '../Button/Button';
import style from './Modal.module.css';

const Modal = (props) => {
    const [active, setActive] = useState(false);
    
    useEffect(() => {
        props.active ? setActive(style.Active) : setActive('');
    }, [props.active])

    return (
        <div className={[style.Modal, active].join(' ')} >
            <div className={style.Title}><h3>{props.title}</h3></div>
                <div className={style.Content}>
                    {props.children}
                </div>
            <div className={style.Close}>
                <div ><Button clicked={props.close} danger>Fechar</Button></div>
            </div>
        </div>
    )
}

export default Modal;
