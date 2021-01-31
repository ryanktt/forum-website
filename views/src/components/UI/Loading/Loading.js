import React from 'react';
import style from './Loading.module.css';

const Spinner = () => {
    return (
        <div className={style.LoadFacebookG}>
            <div className={[style.BlockG_1, style.Facebook_blockG].join(' ')}></div>
            <div className={[style.BlockG_2, style.Facebook_blockG].join(' ')}></div>
            <div className={[style.BlockG_3, style.Facebook_blockG].join(' ')}></div>
        </div>
    )
};


export default Spinner;
