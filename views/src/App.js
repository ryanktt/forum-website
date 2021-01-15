import React from 'react';
import Layout from './hoc/Layout/Layout'
import Threads from './containers/Threads/Threads';
import Categories from './containers/Categories/Categories';

const App = () => {
  return (
    <Layout>
        <Categories />
        <Threads/>
    </Layout>
    
  )
  
}

export default App;
