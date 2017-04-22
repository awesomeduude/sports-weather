import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'

import LoginForm from './LoginForm.jsx'

@inject('store') @observer
class LoginPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="login">
        <h1>Login</h1>
        {this.props.store.formError &&
          <div className="errors">
            <p className="error-text">{this.props.store.formError}</p>
          </div>
        }

        <LoginForm store={this.props.store}/>
      </div>
    )
  }
}

LoginPage.propTypes = {
  store: PropTypes.object
}
export default LoginPage
