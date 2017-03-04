import React, { Component } from 'react'
import { Router, Route, Link, IndexRedirect, browserHistory } from 'react-router'
import { Provider } from 'mobx-react'

import App from './App.jsx'
import Dashboard from './Dashboard.jsx'
import Event from './Event.jsx'
import LoginPage from './LoginPage.jsx'
import SignupPage from './SignupPage.jsx'

import logout from './logout.js'

import requireAuth from './requireAuth.jsx'

class AppContainer extends Component {
  constructor(props) {
    super(props)
  }
  getChildContext() {
    return {
      router: browserHistory
    }
  }
  render() {
    return (
      <Provider store={this.props.user}>
        <Router history={browserHistory}>
          <Route path='/' component={App}>
            <IndexRedirect to='/login' />
            <Route path='signup' component={SignupPage} />
            <Route path='dashboard' component={requireAuth(Dashboard, this.props.user)}/>
            <Route path='events' component={requireAuth(Event, this.props.user)}/>
            <Route path='login' component={LoginPage} />
            <Route path='logout' onEnter={() => logout(this.props.user)}>
              <IndexRedirect to='/'/>
            </Route>
          </Route>
        </Router>
      </Provider>
    )
  }

}
AppContainer.childContextTypes = {
  router: React.PropTypes.object.isRequired
}
export default AppContainer
