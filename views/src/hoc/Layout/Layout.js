import React from 'react';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import style from './Layout.module.css';
import Wrapper from './Wrapper/Wrapper';

const Layout = (props) => {
    return (
        <div className={style.Layout}>
            <Navigation/>
                <Wrapper>
                    {props.children}
                </Wrapper>
            <Footer />
            
        </div>
    )
}

export default Layout;