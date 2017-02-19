import React, { Component } from 'react'
import { observer } from 'mobx-react'
import axios from 'axios'

import EventTable from './EventTable.jsx'

@observer
class App extends Component {
  componentWillMount() {
    axios.get('/api').then(response => {
      this.props.store.setUser(response.data.user)
    })
  }
  render() {
    const { name, user } = this.props.store
    return (
      <div>
        <h1>Hello, {name}</h1>
        {user ?
          <EventTable user={user}/>
          :
          <p>Spinner</p>
        }
      </div>
    )
  }
}
export default App
