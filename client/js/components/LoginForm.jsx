import React, { Component } from 'react'
import axios from 'axios'

import Form from './Form.jsx'

class LoginForm extends Component {
  constructor(props) {
    super(props)
  }

  handleFormSubmit(fields) {

    const { email, password } = fields
    const { store } = this.props

    axios.post('/api/login', {
      email: email.value,
      password: password.value
    }).then(response => {
      if (response.data.error) {
        store.setFormError(response.data.error)
      } else {
        this.props.store.resetFormError()
        store.setUser(response.data.user)
        this.context.router.push('/dashboard')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <Form
        onFormSubmit={this.handleFormSubmit.bind(this)}
        formType="Login"
        fields={
          [
            {
              inputType: 'text',
              type: 'email',
              label: 'Email',
              placeholder: 'Enter Email'
            },
            {
              inputType: 'password',
              type: 'password',
              label: 'Password',
              placeholder: 'Enter Password'

            }
          ]
        }
      />
    )
  }
}
LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default LoginForm
