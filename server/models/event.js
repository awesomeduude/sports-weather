const mongoose = require('mongoose')
const { Schema } = mongoose

const User = require('./user')

const eventSchema = Schema({
  id: Number,
  date: String,
  title: String,
  description: String,
  city: String,
  state: String,
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

  }).catch(err => {
    console.log(err)
  })
}
module.exports.deleteEvent = (id) => {
  const query = {'_id': id}

  Event.findOne(query, (err, event) => {

    if (event) {
      event.remove()
      event.save()
    }

  })
}
