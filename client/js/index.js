import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App.jsx'
import User from './AppState'

const user = new User()
window.store = user

const app = document.getElementById('app')

if (app) {
  ReactDOM.render(<App store={user} />,
  app)
}
