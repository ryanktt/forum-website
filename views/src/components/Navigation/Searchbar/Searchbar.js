import React from 'react';
import style from './Searchbar.module.css';

const Searchbar = (props) => {
    return (
        
        <div className={style.Searchbar}>
            <input placeholder="O que procura?"></input>
            <button><i className="fas fa-search"></i></button>
        </div>
    )
}

export default Searchbar;