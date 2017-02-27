import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import axios from 'axios'

import LoginForm from './LoginForm.jsx'

@inject('store') @observer
class LoginPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="login">
        {this.props.store.error ?
          <div className="errors">
            <p className="error-text">{this.props.store.error}</p>
          </div>
          :
          null
        }
        <LoginForm store={this.props.store}/>
      </div>
    )
  }
}

export default LoginPage
