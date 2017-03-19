import React from 'react'
import axios from 'axios'
export default function(Component, store) {

  class Authenticate extends React.Component {
    constructor(props) {
      super(props)
    }
    componentDidMount() {
      console.log('did mounted')
      axios.get('/api/').then(response => {
        console.log(response.data.user)
        if (response.data.user) {
          store.setUser(response.data.user)
        }
        if (!store.isAuthenticated) {
          this.context.router.push('/login')
        }
      })

    }
    render() {
      return <Component {...this.props}/>
    }
  }
  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  return Authenticate
}
