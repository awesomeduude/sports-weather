import React from 'react'

export default function(Component, store) {

  class Authenticate extends React.Component {
    constructor(props) {
      super(props)
    }
    componentWillMount() {
      
      if (!store.isAuthenticated) {
        this.context.router.push('/login')
      }
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
