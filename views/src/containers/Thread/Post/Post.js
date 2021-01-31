import React from 'react'
import style from './Post.module.css';
import userImg from '../../../assets/user.png';

const Post = () => {
    return (
        <div className={style.Post}>
            <div className={style.UserDetails}>
                <img src={userImg} alt='user-img'/>
                <div>
                    
                </div>
                <h4>Username</h4>
                <div className={style.UserDetailsBox}>
                    <div>
                        <i class="far fa-user"></i>
                        <p>Mar 19, 2019</p>
                    </div>
                    <div>
                        <i class="far fa-comments"></i>
                        <p>13656</p>
                    </div>
                    <div>
                        <i class="far fa-thumbs-up"></i>
                        <p>136</p>
                    </div>
                    <div>
                    <i class="far fa-thumbs-down"></i>
                        <p>136</p>
                    </div>
                </div>
            </div>

            <div className={style.Content}>
                <div className={style.ContentBox}>
                    <div className={style.PostInf}>
                        <p>44 minutos atrás</p>
                        <p>#3</p>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                
                <div className={style.UserActions}>              
                    <div className={style.Action}>
                        <i class="fas fa-exclamation-circle"></i>
                        <p>Reportar</p>
                    </div>

                    <div className={style.Actions}> 
                        <div className={style.Action}>
                            <i class="far fa-thumbs-up"></i>
                            <p className={style.actionParagraph}>Like</p>
                        </div>
                        <div className={style.Action}>
                            <i class="far fa-thumbs-down"></i>
                            <p className={style.actionParagraph}>Dislike</p>
                        </div>
                        <div className={style.Action}>
                            <i class="fas fa-reply"></i>
                            <p className={style.actionParagraph}>Responder</p>
                        </div>   
                    </div>
 
                </div>
            </div>

        </div>
    )
}

export default Post;
