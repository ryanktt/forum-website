import React from 'react'
import style from './Toolbar.module.css';
import HamburgerToggle from '../SideDrawer/HamburgerToggle/HamburgerToggle';
import Button from '../../UI/Button/Button';
import userImg from '../../../assets/user.png';

const Toolbar = (props) => {

    
    return ( 
        <div className={style.Toolbar}>
                <HamburgerToggle clicked={props.sideDrawerHandler}/>
                {!props.isAuth ? <Button link='/auth/login'>Login</Button>
                : <div className={style.UserNavOptions}>
                    <img alt='user-img' src={userImg} />
                    <i class="far fa-envelope"></i>
                    <i class="far fa-bell"></i>
                </div>}
 
        </div>
    )
}

export default Toolbar
