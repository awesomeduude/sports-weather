import React, { Component, PropTypes } from 'react'
import axios from 'axios'

export default (OldComponent, store) => {
  class Authenticate extends Component {
    componentDidMount() {
      axios.get('/api/').then(response => {
        store.isFetchingUser()
        const user = response.data.user
        if (user) {
          store.setUser(user)

        } else {
          this.context.router.push('/login')
        }
      })
    }
    render() {
      return <OldComponent {...this.props} />
    }
  }
  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  }
  return Authenticate
}