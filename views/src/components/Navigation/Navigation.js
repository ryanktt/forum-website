import React, {useState} from 'react';
import style from'./Navigation.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';


const Navigation = (props) => {
    const [state, setState] = useState({
        sDrawerActive: false,
        backdrop: false
    })

    let backdrop = null;
    const toggleSideDrawer = () => {

        setState (
            {
                sDrawerActive: !state.sDrawerActive,
                backdrop: !state.backdrop
            }
        )
        
        

    }
    if(state.backdrop) {
        backdrop = (<Backdrop clicked={toggleSideDrawer}/>);
    }
    else {
        backdrop = null
    }

    return ( 
        <>
            {backdrop}
            <div className={style.Nav}>
                <Toolbar sideDrawerHandler={toggleSideDrawer}/>
                <SideDrawer active={state.sDrawerActive}/>
            </div>
        </>
    )
}

export default Navigation;