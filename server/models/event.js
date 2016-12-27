const mongoose = require('mongoose')
const { Schema } = mongoose

const User = require('./user')

const eventSchema = Schema({
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
