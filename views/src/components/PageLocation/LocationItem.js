import React from 'react';
import {connect} from 'react-redux';
import style from './PageLocation.module.css';
import {reFetchPage} from '../../redux/actions/thread';

const LocationItem = (props) => {
    const {category, pageNumber, selected, history, reFetchPage, content, classes} = props;

    const onClick = () => {
        console.log(pageNumber)
        reFetchPage();
        history.push(`/threads/${category}?page=${pageNumber}`);
    
    }
    let selectedItem = null;
    let itemContent = pageNumber;
    if(selected) selectedItem = style.Selected;
    if(content) itemContent = content;

    return (
        <div className={classes}
            onClick={onClick} 
            className={[selectedItem, classes].join(' ')} >
            <p >{itemContent}</p>
        </div>
    );
    
}
const mapDispatchToProps = dispatch => {
    return {
        reFetchPage: () => dispatch(reFetchPage)
    }
}

export default connect(null, mapDispatchToProps)(LocationItem);
