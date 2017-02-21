import React, { Component } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import axios from 'axios'

@observer
class EventForm extends Component {

  constructor(props) {
    super(props)

  }
  handleFormSubmit(e) {
    e.preventDefault()
    const { date, title , description, city, state} = this.refs
    const { store } = this.props
    axios.post('/api/events', {
      data: {
        date: date.value,
        title: title.value,
        description: description.value,
        city: city.value,
        state: state.value
      }
    }).then(response => {
      console.log(response)

      if (response.data.error) {
        store.setFormError(response.data.error)
      } else {
        this.props.store.resetFormError()
        store.setUser(response.data)
        store.setCurrentEventAction('VIEW')
      }
    })
  }
  render() {

    return (
      <form onSubmit={this.handleFormSubmit.bind(this)} action="" className="form event-form">
        <fieldset className="form-fieldset">
          <label htmlFor="title" className="form-label">Event Title</label>
          <input ref='title' type="text" className="form-input" id="title" name='title' placeholder='Enter Event Title'/>
        </fieldset>
        <fieldset className="form-fieldset">
          <label htmlFor="date" className="form-label">Date</label>
          <input ref='date' type="text" className="form-input" id="date" name='date' placeholder='mm-dd-yy'/>
        </fieldset>
        <fieldset className="form-fieldset">
          <label htmlFor="description" className="form-label">Description</label>
          <input ref='description' type="text" className="form-input" id="description" name='description' placeholder='Enter a Description'/>
        </fieldset>
        <div className="inline-row">
          <fieldset className="form-fieldset">
            <label htmlFor="city" className="form-label">City</label>
            <input ref='city' type="text" className="form-input" id="city" name='city' placeholder='Enter a City'/>
          </fieldset>
          <fieldset className="form-fieldset">
            <label htmlFor="state" className="form-label">State</label>
            <input ref='state' type="text" className="form-input" id="state" name='state' placeholder='CA'/>
          </fieldset>
        </div>
        <button className="btn btn-blue" type='submit'>{this.props.type}</button>
      </form>
    )
  }
}

export default EventForm
