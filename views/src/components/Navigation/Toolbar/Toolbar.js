import React, {useState} from 'react'
import NavigationLink from '../NavLink/NavigationLink';
import style from './Toolbar.module.css';
import Searchbar from '../Searchbar/Searchbar';
import HamburgerToggle from '../SideDrawer/HamburgerToggle/HamburgerToggle';
import Button from '../../UI/Button/Button';

const Toolbar = (props) => {

    
    return (
        <div className={style.Toolbar}>
                <HamburgerToggle clicked={props.sideDrawerHandler}/>
                <Button link='/auth/login'>Login</Button>
                
                    
                
        </div>
    )
}

export default Toolbar
