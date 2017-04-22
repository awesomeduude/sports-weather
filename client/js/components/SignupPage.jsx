import React, { Component, PropTypes } from 'react'
import { inject, observer } from 'mobx-react'

import SignupForm from './SignupForm.jsx'

@inject('store') @observer
class SignupPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
      <h1>Signup</h1>
        {this.props.store.formError &&
          <div className="errors">

            <p className="error-text">{this.props.store.formError}</p>
          </div>
        }
        <SignupForm store={this.props.store}/>
      </div>
    )
  }
}

SignupPage.propTypes = {
  store: PropTypes.object
}
export default SignupPage