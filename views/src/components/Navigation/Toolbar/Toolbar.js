import React from 'react'
import style from './Toolbar.module.css';
import HamburgerToggle from '../SideDrawer/HamburgerToggle/HamburgerToggle';
import Button from '../../UI/Button/Button';
import userImg from '../../../assets/user.png';

const Toolbar = (props) => {
    let loginButton = null
    if (props.isAuth !== null) loginButton = <Button link='/auth/login'>Login</Button>;

    return ( 
        <div className={style.Toolbar}>
                <HamburgerToggle clicked={props.sideDrawerHandler}/>
                {!props.isAuth ? loginButton
                : <div className={style.UserNavOptions}>
                    <img alt='user-img' src={userImg} />
                    <i class="far fa-envelope"></i>
                    <i class="far fa-bell"></i>
                </div>}
 
        </div>
    )
}

export default Toolbar
