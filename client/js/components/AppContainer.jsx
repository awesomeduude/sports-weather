import React, { Component } from 'react'
import { Router, Route, Link, IndexRedirect, browserHistory } from 'react-router'
import { Provider } from 'mobx-react'

import App from './App.jsx'
import Dashboard from './Dashboard.jsx'
import Event from './Event.jsx'
import LoginPage from './LoginPage.jsx'
import logout from './logout.js'

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
            <Route path='dashboard' component={Dashboard}/>
            <Route path='events' component={Event}/>
            <Route path='login' component={LoginPage} />
            <Route path='logout' onEnter={() => logout(this.props.user)}>
              <IndexRedirect to='/'></IndexRedirect>
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
