import React from 'react';
import FetchLink from '../FetchLink/FetchLink';
import style from './Location.module.css';

const Location = (props) => {
    const {items} = props;

    const locationItems = items.map((item, i) => {
        return (
            <div key={item.value}>
                <i key={i + Math.random()} className="fas fa-chevron-right"></i>
                {items[items.length - 1] === item 
                    ?<FetchLink key={item.name}  underline path={item.path}><p className={style.Current}>{item.name}</p></FetchLink>
                    :<FetchLink key={item.path} underline path={item.path}><p>{item.name}</p></FetchLink>
                }

            </div>
        )
    })

    return (
        <div className={style.Location}>
                <p >FórumPlayers</p>
            {locationItems}
        </div>
    )
}

export default Location;
