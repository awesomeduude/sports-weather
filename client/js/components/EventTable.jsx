import React from 'react'
import { observer } from 'mobx-react'

const EventTable = observer(props =>
  <table className='event-table' cellSpacing='0'>
    <thead>
      <tr>
        <th className="table-section">Id</th>
        <th className="table-section">Event</th>
        <th className="table-section">Date</th>
        <th className="table-section">City</th>
        <th className="table-section">State</th>
        <th className="table-section">Description</th>
        <th className="table-section">Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        props.user.events.map(event =>
        <tr key={event._id}>
          <td className="event-data">{event._id}</td>
          <td className="event-data">{event.title}</td>
          <td className="event-data">{event.date}</td>
          <td className="event-data">{event.city}</td>
          <td className="event-data">{event.state}</td>
          <td className="event-data">{event.description}</td>
          <td className="event-data">
            <i onClick={() => {props.handleEditEventClick(event) }} className="fa fa-pencil-square-o"/>
            <i onClick={() => {props.handleDeleteEventClick(event._id) }} className="fa fa-trash-o"/>
          </td>
        </tr>
        )
      }
    </tbody>
  </table>
)

export default EventTable
