import React from 'react';
import {Link} from 'react-router-dom';
import style from './NotificationItem.module.css';
import {dateFormat} from '../../../../utils/dateFormat';

const NotificationItem = (props) => {
    const {thread, sender, notification} = props;
    let threadPath = `/thread/${thread.category}/${thread._id}`;
    if(thread.category === 'conversation') threadPath = `/user/conversation/${thread._id}`

    return (
        <>
            <div className={style.Notification}>

                <div className={[style.ProfilePic, style.Box].join(' ')}>
                    <Link to={`/member/${sender._id}`} >
                        <img className={style.SenderPic} src={sender.profile.userImg} alt="user-img"/>
                    </Link>
                </div>

                <div className={[style.Post, style.Box].join(' ')}>
                    <div className={style.Content}>
                        <p className={style.Title}>
                            <Link to={`/member/${sender._id}`}>{sender.name}</Link> Te quotou no tópico: <Link to={threadPath}>{thread.title}</Link>
                        </p>

                        <div className={style.Details}>
                            <p>{dateFormat(notification.createdAt)}</p>
                        </div>
                    </div>
                
                </div> 

            </div>
            <hr className={style.Hr}/>
        </>
    )
}

export default NotificationItem;
