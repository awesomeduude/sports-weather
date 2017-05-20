import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import Logout from './Logout.jsx'

@inject('store') @observer
class LogoutPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Logout store={this.props.store}/>
    )
  }
}

export default LogoutPage