import React from 'react';
import style from './SideDrawer.module.css';
import NavLink from '../NavLink/NavigationLink';
import Searchbar from '../Searchbar/Searchbar';

const SideDrawer = (props) => {
        let classes = [style.SideDrawer];
    if(props.active) {
         classes = [style.SideDrawer, style.Active];
    }
        
    return (
        <div className={classes.join(' ')}>
            <Searchbar/>
            <ul>     
                <NavLink link='/'>Home</NavLink>
                <NavLink link='/'>Jogos</NavLink>
                <NavLink link='/'>Animes</NavLink>
                <NavLink link='/'>Tech</NavLink>
            </ul>
            
        </div>
    )
}

export default SideDrawer;


