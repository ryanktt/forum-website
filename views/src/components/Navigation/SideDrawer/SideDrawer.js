import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import style from './SideDrawer.module.css';
import NavLink from '../NavLink/NavigationLink';
import Searchbar from '../Searchbar/Searchbar';
import {categories} from '../../../utils/categories';

const SideDrawer = (props) => {
    const{location, isAuth} = props;
        let classes = [style.SideDrawer];
    if(props.active) {
         classes = [style.SideDrawer, style.Active];
    }
        
    return (
        <div className={classes.join(' ')}>
            {isAuth ? <Searchbar/> : null}
            <ul>     
                {categories.map(category => {
                    const path = `/threads/${category.value}`;
                    
                    if (location.pathname === path) {
                        return <NavLink active={true} link={path}>{category.icon} {`${category.name}`}</NavLink>
                    }

                    return <NavLink  link={path}>{category.icon} {`${category.name}`}</NavLink>
                })}
                
            </ul>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(withRouter(SideDrawer));


