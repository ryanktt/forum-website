import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import style from './Toolbar.module.css';
import HamburgerToggle from '../SideDrawer/HamburgerToggle/HamburgerToggle';
import Button from '../../UI/Button/Button';
import FetchLink from '../../FetchLink/FetchLink';
import {logout} from '../../../redux/actions/auth';

const Toolbar = (props) => {
    let loginButton = null
    if (props.isAuth !== null) loginButton = <Button intense link='/auth/login'>Login</Button>;

    const onLogout = () => {
        props.logout();
        props.history.push('/')
    }

    return ( 
        <div className={style.Toolbar}>
                <HamburgerToggle clicked={props.sideDrawerHandler}/>
                {!props.isAuth ? loginButton
                : <div className={style.UserNavOptions}>
                    <Link to='/user/account'><img alt='user-img' src={props.userImg} /></Link>
                    <FetchLink path='/user/conversations'><i className="far fa-envelope"></i></FetchLink>
                    <i className="far fa-bell"></i>
                    <i onClick={onLogout} class="fas fa-sign-out-alt"></i>
                </div>}
 
        </div>
    )
}

const mapStateToProps = state => {
    if(state.auth.user){
        return {
            userImg: state.auth.user.profile.userImg
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Toolbar));
