import React, { Component} from 'react'
import { inject, observer } from 'mobx-react'

import Navbar from './Navbar.jsx'

@inject('store') @observer
class App extends Component {
  render() {
    return (
      <div>
        <input type="checkBox" className="nav-trigger" id="nav-trigger"/>
        <label htmlFor="nav-trigger" className="hamburger"></label>
        <Navbar signedIn={this.props.store.user || null}/>
        <main className="content">
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default App
