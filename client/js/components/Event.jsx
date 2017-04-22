import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import axios from 'axios'

import EventForm from './EventForm.jsx'
import EventTable from './EventTable.jsx'
import Navbar from './Navbar.jsx'


@inject('store') @observer
class Event extends Component {
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
  handleEditEventClick(event) {
    this.props.store.setCurrentEventAction('EDIT')
    this.props.store.setEventBeingEdited(event)


  }
  handleDeleteEventClick(id) {

    this.props.store.setCurrentEventAction('DELETE')
    if (confirm('Are you sure you want to delete this event?')) {
      axios.delete('/api/events', {
        data:{
          id
        }
      }).then(response => {
        if (response.data.error) {
          store.setFormError(response.data.error)
        } else {
          this.props.store.resetFormError()
          store.setUser(response.data)
          store.setCurrentEventAction('VIEW')
        }
      })
    }

  }
  render() {
    const { user, currentEventAction } = this.props.store
    return (
      <div>
      <h1>Events</h1>
        {user ?
          <div>
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
Event.propTypes = {
  user: PropTypes.object.isRequired,
  store: PropTypes.object,

}

export default Event
