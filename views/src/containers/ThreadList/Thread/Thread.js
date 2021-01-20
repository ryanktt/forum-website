import React from 'react'
import style from './Thread.module.css';
import userImg from '../../../assets/user.png'


const Thread = () => {
    return (
        <>
        <div className={style.Thread}>

            <div className={[style.ProfilePic, style.Box].join(' ')}>
                <img className={style.ThreadOwnerPic} alt="user-img" src={userImg}/>
            </div>

            <div className={[style.Post, style.Box].join(' ')}>
                <div className={style.PostContent}>
                    <h4>Lorem Ipsum Dolores Matheo Solaires Astora Gravda Magna Lorem Ipsum Dolores Matheo Solaires Astora Gravda Magna Lorem Ipsum Dolores Matheo Solaires Astora Gravda Magna </h4>
                    <div className={style.PostDetails}>
                        <p>Lorensio</p>
                        <p>Dec 14, 2020 at 6:56 AM</p>
                    </div>
                </div>
            </div>

            <div className={[style.Details, style.Box].join(' ')}>
                <div className={style.DetailsBox}>
                    <div>
                        <p>Replies:</p> 
                        <p>10</p>
                    </div>
                    <div>
                        <p>Views:</p>
                        <p>140</p>
                    </div>        
                </div>
            </div>

            <div className={style.DetailsMobile}>
                <div className={style.DetailsMobileBox}>
                    <i class="fas fa-comment-alt"></i>
                    <p>259</p>
                </div>
            </div>

            <div className={[style.LastPost, style.Box].join(' ')}>
                <div>
                    <p>Today at 8:54 AM</p>
                    <p>Lauren</p>
                </div>
            </div>

            <div className={[style.ProfilePic2, style.Box].join(' ')}>
                <img className={style.LastPostPic} alt="user-img" src={userImg}/>
            </div>
        </div>
        <hr/>
        
        </>
    )
}

export default Thread;
