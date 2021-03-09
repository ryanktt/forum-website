import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import ThreadList from './containers/ThreadList/Threads';
import Categories from './containers/Categories/Categories';
import Thread from './containers/Thread/Thread';
import Auth from './containers/Auth/Auth';
import NewThread from './containers/NewThread/NewThread';
import Admin from './containers/Admin/Admin';
import UserPage from './containers/User/UserPage/UserPage';
import ProfileSettings from './containers/User/Account/ProfileSettings/ProfileSettings';
import EditPost from './containers/Admin/EditPost/EditPost';
import Search from './containers/User/Search/Search';
import Notifications from './containers/User/Notifications/Notifications';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import {loadUser, logout} from './redux/actions/auth';
import setAuthToken from './utils/setAuthToken';

const asyncNewThread = asyncComponent(() => {
  return import('./containers/NewThread/NewThread');
});
const asyncThread = asyncComponent(() => {
  return import('./containers/Thread/Thread');
});
const asyncThreadList = asyncComponent(() => {
  return import('./containers/ThreadList/Threads');
});
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});
const asyncUserPage = asyncComponent(() => {
  return import('./containers/User/UserPage/UserPage');
});
const asyncProfileSettings = asyncComponent(() => {
  return import('./containers/User/Account/ProfileSettings/ProfileSettings');
});
const asyncSearch = asyncComponent(() => {
  return import('./containers/User/Search/Search');
});
const asyncNotifications = asyncComponent(() => {
  return import('./containers/User/Notifications/Notifications');
});
const asyncEditPost = asyncComponent(() => {
  return import('./containers/Admin/EditPost/EditPost');
});


const App = (props) => {
  const {isAuth, user} = props;
  //CHECK FOR TOKEN IN LOCAL STORAGE
  useEffect(() => {
    if(localStorage.token) {
      setAuthToken(localStorage.token);
    }
    props.loadUser();

    //LOG USER OUT FROM ALL TABS IF THEY LOGOUT FROM ONE
    window.addEventListener('storage', () => {
      if (!localStorage.token) {
        props.logout();
      }
    })
  }, [])

  let userRoutes, adminRoutes = null;

  if(isAuth) userRoutes = <Switch>
    <Route path='/user/new-conversation' exact component={asyncNewThread}/>
    <Route path='/user/conversations' exact component={asyncThreadList}/>
    <Route path='/user/conversation/:id' exact component={asyncThread}/>
    <Route path='/user/account' exact component={asyncProfileSettings}/>
    <Route path='/user/new-thread' exact component={asyncNewThread}/>
    <Route path='/user/search' exact component={asyncSearch} />
    <Route path='/user/notifications' exact component={asyncNotifications}/>
  </Switch>

  if(user) if(user.settings.role === 2) adminRoutes = <Switch>
    <Route path='/admin/edit-account/:id' exact component={asyncProfileSettings}/>
    <Route path='/admin/edit-thread/:id' exact component={asyncNewThread}/>
    <Route path='/admin/edit-post/:id' exact component={asyncEditPost}/>
  </Switch>

  return (
    <Layout>
      <Route path='/' exact component={Categories}/>
      <Route path='/threads/:category' exact component={asyncThreadList}/>
      <Route path='/thread/:category/:id' exact component={asyncThread}/>
      <Route path='/auth/login' exact component={asyncAuth}/>
      <Route path='/auth/signup' exact component={asyncAuth}/>
      <Route path='/member/:id' exact component={asyncUserPage}/>
      {userRoutes}
      {adminRoutes}
    </Layout>
    
  )
  
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isAuth: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => dispatch(loadUser),
    logout: () => dispatch(logout)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
