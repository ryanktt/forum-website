import React from 'react';
import style from './Loading.module.css';

const Loading = () => {

    return (
        <>
        <div style={{zIndex: '4',  backgroundColor: 'rgb(250, 250, 250)',width: '100%', height: '100%', position: 'absolute', left: '0', bottom: '0'}}></div>
        <div className={style.LoadFacebookG}>
            <div className={[style.BlockG_1, style.Facebook_blockG].join(' ')}></div>
            <div className={[style.BlockG_2, style.Facebook_blockG].join(' ')}></div>
            <div className={[style.BlockG_3, style.Facebook_blockG].join(' ')}></div>
        </div>
        </>
    )
};


export default Loading;
