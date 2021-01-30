import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import './index.css';
import App from './App';

import setAuthToken from './utils/setAuthToken';

import reportWebVitals from './reportWebVitals';
import rootReducer from './redux/rootReducer'; 


const middleware = [thunk];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

// GET PREV AND CURRENT STATE AND CHECK IF TOKEN CHANGED TO SET THE NEW ONE
let currentState = store.getState();

store.subscribe(() => {
  const prevState = currentState;
  currentState = store.getState();

  if(prevState.auth.token !== currentState.auth.token) {
    const token =  currentState.auth.token;
    console.log(currentState)
    setAuthToken(token);
  }
})


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
