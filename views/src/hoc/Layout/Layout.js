import React from 'react';
import {connect} from 'react-redux';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import style from './Layout.module.css';
import Wrapper from './Wrapper/Wrapper';
import Loading from '../../components/UI/Loading/Loading';


const Layout = (props) => {

    let loading = null;
    //Deal with when Loading component should appear
    const states = props.loading
    const statesArr = [];
    for(const key in states) {
       statesArr.push(states[key]);
    }

    const isLoading = statesArr.some(obj =>  obj.loading === true)
    if(isLoading) {
        loading = <><Loading/></>
    }


    return (
        <div className={style.Layout}>
            <Navigation/>
                {isLoading ? loading : null}
                <Wrapper>
                    {props.children}
                </Wrapper>
            <Footer />
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state
    }
}

export default connect(mapStateToProps)(Layout);