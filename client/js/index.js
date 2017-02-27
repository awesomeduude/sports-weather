import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

import App from './components/App.jsx'
import Dashboard from './components/Dashboard.jsx'
import Event from './components/Event.jsx'
import Login from './components/Login.jsx'


import User from './AppState'

const user = new User()
window.store = user

const app = document.getElementById('app')

if (app) {

  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path='dashboard' component={Dashboard}/>
        <Route path='events' component={Event}/>
        <Route path='login' component={Login} />
        <Route path='signout' component={Signout}/>
      </Route>
    </Router>
  , app)
}
