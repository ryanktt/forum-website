import React from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import style from './FetchLink.module.css';
import {reFetchPage} from '../../redux/actions/thread';

const FetchLink = (props) => {
    //pass state to links refetch page data

    let {path, underline, classes, reFetchPage} = props;


    const fetch = () => {
        reFetchPage()
    }
   
    underline ? underline = style.Underline : underline = ''

    return (
            <Link onClick={fetch} className={[underline, classes].join(' ')} to={path} >{props.children}</Link>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        reFetchPage: () => dispatch(reFetchPage)
    }
}

export default connect(null,mapDispatchToProps)(FetchLink);
