import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/app.jsx'
import User from './AppState'

const calvin = new User('Calvin')
window.store = calvin

const app = document.getElementById('app')

if (app) {
  ReactDOM.render(<App store={calvin} />,
  app)
}
