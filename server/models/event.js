const mongoose = require('mongoose')
const { Schema } = mongoose

const User = require('./user')

const eventSchema = Schema({
  id: Number,
  date: String,
  title: String,
  description: String,
  city: String,
  email: String
})

const Event = module.exports = mongoose.model('Event', eventSchema)

module.exports.createEvent = (eventData) => {
  const newEvent = new Event(eventData)
  newEvent.save()
}
module.exports.getAllEvents = (date, callback) => {
  const query = {date}
  Event.find(query).then((response) => {
    callback(response)
  })
}
module.exports.deleteEvent = (email, date, id) => {
  const query = {email, date, id}

  Event.findOne(query, (err, event) => {

    event.remove()
    event.save()
  })
}
