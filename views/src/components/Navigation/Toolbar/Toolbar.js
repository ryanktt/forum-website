import React, {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import style from './Toolbar.module.css';
import HamburgerToggle from '../SideDrawer/HamburgerToggle/HamburgerToggle';
import Button from '../../UI/Button/Button';
import FetchLink from '../../FetchLink/FetchLink';
import {logout} from '../../../redux/actions/auth';
import {getNotificationCount} from '../../../redux/actions/user';
import logo from '../../../assets/logo.png';

const Toolbar = (props) => {
    const {userImg, isAuth, notifications, history, sideDrawerHandler, logout, getNotificationCount, location} = props;
    let loginButton = null
    if (isAuth !== null) loginButton = <Button  link='/auth/login'>Login</Button>;
    const [notificationNumber, setNotificationNumber] = useState(null);

    useEffect(() => {
        if(isAuth) getNotificationCount();
    }, [isAuth])

    if(notifications) if(notifications.count != notificationNumber) setNotificationNumber(notifications.count);

    useEffect(() => {
        getNotificationCount();
        if(notifications) setNotificationNumber(notifications.count);
    }, [location.pathname])


    
    const onLogout = () => {
        logout();
        history.push('/')
    }

    return ( 
        <div className={style.Toolbar}>
                <HamburgerToggle clicked={sideDrawerHandler}/>
                <Link to='/'><div className={style.Logo}><img src={logo} alt='logo'/></div></Link>
                {!isAuth ? loginButton
                : <div className={style.UserNavOptions}>
                    <Link to='/user/account'><img alt='user-img' src={userImg} /></Link>
                    <FetchLink path='/user/conversations'><i className="far fa-envelope"></i></FetchLink>
                    <div style={{position: 'relative'}}>
                        <Link to='/user/notifications'>
                            <i className="far fa-bell"></i>
                            {notificationNumber ? <p className={style.NotificationNumber}>{notificationNumber}</p> : null}
                        </Link></div>
                    <i onClick={onLogout} className="fas fa-sign-out-alt"></i>
                </div>}
 
        </div>
    )
}

const mapStateToProps = state => {
    if(state.auth.user){
        return {
            userImg: state.auth.user.profile.userImg,
            notifications: state.user.notifications
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout),
        getNotificationCount: () => dispatch(getNotificationCount)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Toolbar));
