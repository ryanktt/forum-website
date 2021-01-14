import React, {useState} from 'react'
import NavLink from '../NavLink/NavLink';
import style from './Toolbar.module.css';
import Searchbar from '../Searchbar/Searchbar';
import HamburgerToggle from '../SideDrawer/HamburgerToggle/HamburgerToggle';

const Toolbar = (props) => {

    
    return (
        <div className={style.Toolbar}>
                <HamburgerToggle clicked={props.sideDrawerHandler}/>
                <ul> 
                    <NavLink>Home</NavLink>
                    <NavLink>Jogos</NavLink>
                    <NavLink>Animes</NavLink>
                    <NavLink>Tech</NavLink>
                </ul>
                <div className={style.Searchbar}>
                    <Searchbar/>
                </div>
        </div>
    )
}

export default Toolbar
