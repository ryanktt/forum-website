import React from 'react';
import style from './Admin.module.css';
import Users from './Users/Users';

const Admin = () => {
    return (
        <div className={style.Admin}>
            <Users/>
        </div>
    )
}

export default Admin;
