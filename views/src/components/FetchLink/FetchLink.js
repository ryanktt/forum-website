import React from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import style from './FetchLink.module.css';
import {reFetchPage} from '../../redux/actions/thread';

const FetchLink = (props) => {
    //pass state to links refetch page data

    let {path, underline, classes, reFetchPage, style} = props;
    if(!style) style = {}

    const fetch = () => {
        reFetchPage()
    }
   
    underline ? underline = style.Underline : underline = '';

    return (
            <Link 
            onClick={fetch} 
            style={style}
            className={[underline, classes].join(' ')} 
            to={{
                pathname: path
            }} >
                {props.children}
            </Link>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        reFetchPage: () => dispatch(reFetchPage)
    }
}

export default connect(null,mapDispatchToProps)(FetchLink);
