import React, { Component} from 'react'
import { observer } from 'mobx-react'

import Navbar from './Navbar.jsx'

class App extends Component {
  render() {
    return (
      <div>
        <input type="checkBox" className="nav-trigger" id="nav-trigger"/>
        <label htmlFor="nav-trigger" className="hamburger"></label>
        <Navbar />
        <main className="content">
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default App
