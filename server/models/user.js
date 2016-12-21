const mongoose = require('mongoose')
const { Schema } = mongoose
const passportLocalMongoose = require('passport-local-mongoose')
const bcrypt = require('bcryptjs')

const userSchema = Schema({

  name: {
    type: String
  },
  email: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  events: [
    {
      id: Number,
      date: String,
      title: String,
      description: String,
      city: String
    }
  ]
})
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',

})

const User = module.exports = mongoose.model('User', userSchema)

module.exports.addEvent = (email, eventData) => {
  const query = {email}
  eventData.id = Math.random()
  User.findOne(query, (err,user) => {
    user.events.push(eventData)

    user.save()
  })

}
module.exports.deleteEvent = (email, id, time) => {
  const query = {email}

  User.findOne(query, (err,user) => {
    let { events } = user

    temp = events.filter((event) => {
    	return (event.id.toString() !== id)
    })
    user.events = temp
    user.save()
    console.log('USER.EVENNTSS', user.events);
    return user.events
  })
}
module.exports.getUserByEmail = (email, callback) => {
  const query = {email}
  User.findOne(query, callback)
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
