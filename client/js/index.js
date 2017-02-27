import React from 'react'
import ReactDOM from 'react-dom'

import AppContainer from './components/AppContainer.jsx'

import User from './AppState'

const user = new User()
window.store = user

const root = document.getElementById('app')

ReactDOM.render(
    <AppContainer user={user}/>
  , root)

//add signout route
