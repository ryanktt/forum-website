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
import {loadUser, logout} from './redux/actions/auth';
import setAuthToken from './utils/setAuthToken';



const App = (props) => {

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


  return (
    <Layout>
      <Route path='/' exact component={Categories}/>
      <Route path='/threads/:category' exact component={ThreadList}/>
      <Route path='/thread/:category/:id' exact component={Thread}/>
      <Route path='/auth/login' exact component={Auth}/>
      <Route path='/auth/signup' exact component={Auth}/>
      <Route path='/user/new-thread' exact component={NewThread}/>
      <Route path='/member/:id' exact component={UserPage}/>
      <Route path='/admin/panel' exact component={Admin}/>
    </Layout>
    
  )
  
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => dispatch(loadUser),
    logout: () => dispatch(logout)
  }
}

export default connect(null, mapDispatchToProps)(App);
