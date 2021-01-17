import React from 'react';
import {Route} from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import ThreadList from './containers/ThreadList/Threads';
import Categories from './containers/Categories/Categories';
import Thread from './containers/Thread/Thread';
import Auth from './containers/Auth/Auth';
import AdminPanel from './containers/Admin/Admin'

const App = () => {
  return (
    <Layout>
      <Route path='/' exact component={Categories}/>
      <Route path='/threads' exact component={ThreadList}/>
      <Route path='/thread' exact component={Thread}/>
      <Route path='/auth/login' exact component={Auth}/>
      <Route path='/auth/signup' exact component={Auth}/>
      <Route path='/admin/panel' component={AdminPanel} />
    </Layout>
    
  )
  
}

export default App;
