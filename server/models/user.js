const mongoose = require('mongoose')
const { Schema } = mongoose
const passportLocalMongoose = require('passport-local-mongoose')
const bcrypt = require('bcryptjs')

const Event = require('./event')

const userSchema = Schema({

  name: String,
  email: {
    type: String,
    index: true
  },
  phone: String,
  events: [
    {
      id: Number,
      date: String,
      title: String,
      description: String,
      city: String,
      state: String
    }
  ]
})
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',

})

const User = module.exports = mongoose.model('User', userSchema)

module.exports.addEvent = (email, eventData, callback) => {
  const query = {email}
  eventData.id = Math.random()

  User.findOne(query, (err,user) => {
    user.events.push(eventData)
    user.save()
    callback(user)
  }).then((response) => {
    // callback(response)
    // console.log('resp00bse', response);
  })
  eventData.email = email
  Event.createEvent(eventData)

}
module.exports.deleteEvent = (email, id, callback) => {
  const query = {email}

  User.findOne(query, (err,user) => {
      let { events } = user

      const temp = events.filter((event) => {
          return (event._id.toString() !== id.toString())
      })

      user.events = temp
      user.save()
      callback(user)
  }).then((response) => {

  })
}
module.exports.editEvent = (email, newEvent, callback) => {
  console.log('newevent%%', newEvent);
  const query = {email}
  User.findOne(query, (err, user) => {
    let { events } = user
    console.log('events%%', events);

    const temp = events.map((event) => {
      if (event.id == newEvent.id) {
        console.log('evnet?*7&', event)
        return newEvent
      } else{
        return event
      }
    })
    user.events = temp
    user.save()
    //edit EVENT SCHEMA too
  }).then((response) => {
    callback()
  })
}
module.exports.getUserByEmail = (email, callback) => {
  const query = {email}
  User.findOne(query, callback)
}
module.exports.findUserByEmail = (email) => {
  const query = {email}
  return User.findOne(query)
}
module.exports.getUserById = (id, callback) => {
  User.findById(id, callback)
}
module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err
    callback(null, isMatch)
  })
}
