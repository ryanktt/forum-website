import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import style from './Searchbar.module.css';
import Button from '../../UI/Button/Button';
import {search} from '../../../redux/actions/user';

const Searchbar = (props) => {
    const {search, history, location} = props;
    const [searchText, setSearchText] = useState('');

    const onChange = (e) => {
        setSearchText(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
     
        if(location.pathname !== '/user/search') {
            history.push('/user/search')
            search(searchText);
        } else {
            history.push(location.pathname);
            search(searchText);
        }
        setSearchText('');
    }

    return (
        <>
           
                <form className={style.Searchbar} onSubmit={(e) => onSubmit(e)}>
                    <input value={searchText} onChange={(e) => onChange(e)} placeholder="O que procura?"></input>
                    <Button button type='submit'><i className="fas fa-search"></i></Button>
                </form>
                
         
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        search: (text, page) => dispatch(search(text, page))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Searchbar));