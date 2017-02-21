import React, { Component } from 'react'
import { observer } from 'mobx-react'
import axios from 'axios'

import EventTable from './EventTable.jsx'
import EventForm from './EventForm.jsx'

@observer
class App extends Component {
  constructor(props){
    super(props)
    this.handleAddEventClick = this.handleAddEventClick.bind(this)
    this.handleEditEventClick = this.handleEditEventClick.bind(this)
    this.handleDeleteEventClick = this.handleDeleteEventClick.bind(this)
  }
  componentWillMount() {
    axios.get('/api').then(response => {
      this.props.store.setUser(response.data.user)
    })
  }
  handleAddEventClick() {
    this.props.store.setCurrentEventAction('CREATE')
  }
  handleEditEventClick() {
    this.props.store.setCurrentEventAction('EDIT')
  }
  handleDeleteEventClick() {
    this.props.store.setCurrentEventAction('DELETE')
  }
  render() {
    const { user, currentEventAction } = this.props.store
    return (
      <div>
        {user ?
          <div>
            <h1>Hello, {this.props.store.name}</h1>
            <EventTable user={user} handleEditEventClick={this.handleEditEventClick} handleDeleteEventClick={this.handleDeleteEventClick}/>
            {currentEventAction === 'VIEW' ?
              <button onClick={this.handleAddEventClick} className="btn btn-blue add-event">Add Event</button>
              :
              null
            }
          </div>
          :
          <p>Spinner</p>
        }
        {this.props.store.formError ?
          <div className="errors">
              <p className="error-text">{this.props.store.formError}</p>
          </div>

          :
          null
        }
        {currentEventAction === 'CREATE' || currentEventAction == 'EDIT' ?
          <EventForm store={this.props.store} type={currentEventAction}/>
          :
          null
        }
      </div>
    )
  }
}
export default App
