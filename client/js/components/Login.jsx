import React from 'react'

const Login = props =>
  <div className="login">
    {props.error ?
      <div className="errors">
        <p className="error-text">{props.error}</p>
      </div>
      :
      null
    }
    <form action="/login" method='post' className="form">
      <fieldset className="form-fieldset">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="text" className="form-input" id='email' name='email' placeholder='Enter Email' defaultValue={this.props.email}/>
      </fieldset>
      <fieldset className="form-fieldset">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-input" id='password' name='password' placeholder='Enter Password'/>
      </fieldset>
      <button className="btn btn-blue" type='submit'>Login</button>
    </form>
  </div>

export default Login
