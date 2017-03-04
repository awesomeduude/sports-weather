import React, { Component } from 'react'
import axios from 'axios'

class SignupForm extends Component {
  constructor(props) {
  super(props)
  }
  handleFormSubmit(e) {
    e.preventDefault()
    const { name, email, phone, password, cpassword } = this.refs
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
      <form onSubmit={this.handleFormSubmit.bind(this)} className="form">
        <fieldset className="form-fieldset">
          <label htmlFor="name" className="form-label">Name</label>
          <input ref="name" type="text" className="form-input" id="name" name="name" placeholder="Enter name"/>
        </fieldset>
        <fieldset className="form-fieldset">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input ref="phone" type="tel" className="form-input" id="phone" name="phone" placeholder="123 456 7890"/>
        </fieldset>
        <fieldset className="form-fieldset">
          <label htmlFor="email" className="form-label">Email</label>
          <input ref="email" type="text" className="form-input" id="email" name="email" placeholder="Enter email"/>
        </fieldset>
        <fieldset className="form-fieldset">
          <label htmlFor="password" className="form-label">Password</label>
          <input ref="password" type="password" className="form-input" id="password" name="password" placeholder=" Enter password"/>
        </fieldset>
        <fieldset className="form-fieldset">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input ref="cpassword" type="password" className="form-input" id="cpassword" name="cpassword" placeholder="Confirm password"/>
        </fieldset>
        <button className="btn btn-blue" type="submit">Signup</button>
      </form>
    )
  }

}
SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default SignupForm