import React, { Component } from 'react'
import axios from 'axios'

class LoginForm extends Component {
  constructor(props) {
    super(props)
  }

  handleFormSubmit(e) {
    e.preventDefault()
    const { email, password } = this.refs
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
      <form onSubmit={this.handleFormSubmit.bind(this)} method='post' className="form">
        <fieldset className="form-fieldset">
          <label htmlFor="email" className="form-label">Email</label>
          <input ref='email' type="text" className="form-input" id='email' name='email' placeholder='Enter Email' defaultValue={this.props.store.email}/>
        </fieldset>
        <fieldset className="form-fieldset">
          <label htmlFor="password" className="form-label">Password</label>
          <input ref='password' type="password" className="form-input" id='password' name='password' placeholder='Enter Password'/>
        </fieldset>
        <button className="btn btn-blue" type='submit'>Login</button>
      </form>
    )
  }
}
LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default LoginForm
