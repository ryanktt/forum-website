import React from 'react';
import FetchLink from '../FetchLink/FetchLink';
import style from './Location.module.css';

const Location = (props) => {
    const {items} = props;

    const locationItems = items.map((item, i) => {
        return (
            <div key={item.value}>
                <i key={i} class="fas fa-chevron-right"></i>
                {items[items.length - 1] === item 
                    ?<FetchLink key={item.name} underline classes={style.Current} path={item.path}>{item.name}</FetchLink>
                    :<FetchLink key={item.name} underline path={item.path}>{item.name}</FetchLink>
                }

            </div>
        )
    })

    return (
        <div className={style.Location}>
                <p >ForumPlayers</p>
            {locationItems}
        </div>
    )
}

export default Location;
