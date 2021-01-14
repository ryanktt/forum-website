import React from 'react';
import Navigation from '../../components/Navigation/Navigation';
import style from './Layout.module.css';
import Wrapper from './Wrapper/Wrapper';

const Layout = (props) => {
    return (
        <div className={style.Layout}>
            <Navigation/>
            <Wrapper>
                {props.children}
            </Wrapper>
            
        </div>
    )
}

export default Layout;