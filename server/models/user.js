const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
// TODO: Destructure schema and model from mongoose

const userSchema = mongoose.Schema({

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

const User = module.exports = mongoose.model('User', userSchema)

module.exports.createUser = (newUser, callback) => {

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash
        newUser.events = []
        newUser.save(callback)
    });
  });
}
module.exports.addEvent = (email, eventData) => {
  const query = {email}
  eventData.id = Math.random()
  User.findOne(query, (err,user) => {
    user.events.push(eventData)
    console.log('added event');
    user.save()
  })

}
module.exports.deleteEvent = (email, id, time) => {
  const query = {email}

  User.findOne(query, (err,user) => {
    let { events } = user
    console.log('beforrre', events);
    temp = events.filter((event) => {
    	return (event.id.toString() !== id)
    })
    user.events = temp
    user.save()
    console.log('afffter', temp);
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

module.exports.userExists = (email) => {
  const query = {email}

  User.find(query,(err, user) => {
    if (user) {
      return true
    } else {
      return false
    }
  })
}
