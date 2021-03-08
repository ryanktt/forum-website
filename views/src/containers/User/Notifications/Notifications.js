import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import style from './Notifications.module.css';
import NotificationItem from './NotificationItem/NotificationItem';
import PageLocation from '../../../components/PageLocation/PageLocation';
import { fetchNotifications } from '../../../redux/actions/user';

const Notifications = (props) => {
    const {notifications, location, history, fetchNotifications} = props;
    const [notificationList, setNotificationList] = useState(null);
    const currentPage = location.search;

    useEffect(() => {
        fetchNotifications(currentPage);

    }, []);

    useEffect(() => {
        if(notifications.data) {
            setNotificationList(notifications.data.map(notification => {
                return <NotificationItem notification={notification} sender={notification.sender} key={notification.id} thread={notification.thread}/>
            }));
        }

    }, [notifications.data]);

    useEffect(() => {
        if(notifications) if (currentPage !== '') fetchNotifications(currentPage);
    }, [currentPage]);

    const pageLocationPath = (category, pageNumber) => {
        return `/user/notifications?page=${pageNumber}`;
    }

    let notificationsSection = null
    if(notifications) notificationsSection = (
        <>
            <h3 style={{marginLeft: '15px', fontSize: '22px', fontWeight: '500'}}>Notificações</h3>
            <div className={style.Notifications}>
                {notificationList}
            </div>
            <div className={style.PageLocation}><PageLocation path={pageLocationPath} history={history} {...notifications.pagination}/></div>
        </>
    )

    return (    
            <>{notificationsSection}</>
    )
}

const mapStateToProps = state => {
    return {
        notifications: state.user.notifications
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNotifications: (page) => dispatch(fetchNotifications(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
