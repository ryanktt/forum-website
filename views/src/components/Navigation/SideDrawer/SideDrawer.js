import React from 'react';
import style from './SideDrawer.module.css';
import NavLink from '../NavLink/NavLink';
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
                <NavLink>Home</NavLink>
                <NavLink>Jogos</NavLink>
                <NavLink>Animes</NavLink>
                <NavLink>Tech</NavLink>
            </ul>
            
        </div>
    )
}

export default SideDrawer;


