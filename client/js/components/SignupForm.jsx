import React, { Component, PropTypes } from 'react'
import axios from 'axios'

import Form from './Form.jsx'

class SignupForm extends Component {
  constructor(props) {
  super(props)
  }
  handleFormSubmit = (fields) => {

    const { name, email, phone, password, cpassword } = fields
    const { store } = this.props

    axios.post('/api/signup', {
      name: name.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
      cpassword: cpassword.value
    }).then(response => {
      if (response.data.error) {
        store.setFormError(response.data.error)
      } else {
        console.log('success?', response.data.sucesss)
        this.props.store.resetFormError()
        this.context.router.push('/login')
      }
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    return (
      <Form
        onFormSubmit={this.handleFormSubmit}
        formType="Signup"
        fields={
          [
            {
              inputType: 'text',
              type: 'name',
              label: 'Name',
              placeholder: 'Enter your name'
            },
            {
              inputType: 'tel',
              type: 'phone',
              label: 'Phone Number',
              placeholder: '123 456 7890'
            },
            {
              inputType: 'text',
              type: 'email',
              label: 'Email',
              placeholder: 'Enter email'
            },
            {
              inputType: 'password',
              type: 'password',
              label: 'Password',
              placeholder: 'Enter password'
            },
            {
              inputType: 'password',
              type: 'cpassword',
              label: 'Confirm Password',
              placeholder: 'Retype your password'
            }
          ]
        }
      />
    )
  }

}

SignupForm.propTypes = {
  store: PropTypes.object
}
SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default SignupForm