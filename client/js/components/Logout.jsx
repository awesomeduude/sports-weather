import React, { Component } from 'react'
import axios from 'axios'

class Logout extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    axios.get('/api/logout').then(response => {
        if (response.data.success) {
          this.props.store.logout()
          this.context.router.push('/login')
        }
        else {
          console.log('didnt logout')
        }
      })
  }
  render() {
    return null
  }
}
Logout.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Logout

