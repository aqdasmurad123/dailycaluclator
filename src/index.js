import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider, provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from './example/Login'
import Dashboard from './example/Dashboard'
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// import {createStore} from 'redux';
// import Reducer from './Reducers/reducer';
// import store  from './store'
import moment from "moment" 
// store.dispatch(setStartDate(moment().format('L')))
// store.dispatch(setEndDate(moment().add(100, 'days').format('L')))
// const store = createStore(Reducer);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/about' component={Dashboard}/>
   
     
      </Switch>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
