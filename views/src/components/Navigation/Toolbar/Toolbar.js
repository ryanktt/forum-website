import React from 'react';
import {Link} from 'react-router-dom';
import style from './Toolbar.module.css';
import HamburgerToggle from '../SideDrawer/HamburgerToggle/HamburgerToggle';
import Button from '../../UI/Button/Button';
import userImg from '../../../assets/user.png';
import FetchLink from '../../FetchLink/FetchLink';

const Toolbar = (props) => {
    let loginButton = null
    if (props.isAuth !== null) loginButton = <Button link='/auth/login'>Login</Button>;

    return ( 
        <div className={style.Toolbar}>
                <HamburgerToggle clicked={props.sideDrawerHandler}/>
                {!props.isAuth ? loginButton
                : <div className={style.UserNavOptions}>
                    <img alt='user-img' src={userImg} />
                    <FetchLink path='/user/conversations'><i class="far fa-envelope"></i></FetchLink>
                    <i class="far fa-bell"></i>
                </div>}
 
        </div>
    )
}

export default Toolbar
