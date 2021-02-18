import React from 'react';
import style from './UserPage.module.css';
import Button from '../../../components/UI/Button/Button';

const UserPage = () => {
    return (
        <div className={style.UserPage}>
            <div className={style.UserPageBox}>
                <div className={style.Img}>
                    <img alt='user-img' src={'https://i.imgur.com/aFUANXE.png'}/>
                </div>
                <div className={style.UserContent}>
                    <h3>Username</h3>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div className={style.UserStatistics}>
                            <h5>Postagens</h5><p>123</p></div>
                        <div className={style.UserStatistics}>
                            <h5>Likes</h5><p>123</p></div>
                        <div className={style.UserStatistics}>
                            <h5>Dislikes</h5><p>123</p></div>
                        <div className={style.UserStatistics}>
                            <h5>Tópicos</h5><p>123</p></div>
                    </div>
                    <hr style={{border: '1px solid grey', borderBottom: '0'}} />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div className={style.UserStatistics} >
                            <h5>Cadastro</h5>
                            <p>12/04/2002</p>
                        </div>
                        <div style={{display: 'flex', alignItems: 'end'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '220px'}}>
                                <Button intense small>Tópicos</Button>
                                <Button intense small>Posts</Button>
                                <Button intense small>Mensagem Privada</Button>
                            </div>

                        </div>
                    </div>
                </div>
                <div></div>
            </div>
            <div></div>
        </div>
    )
}

export default UserPage;
