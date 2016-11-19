const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/events', (req,res) => {
  res.render('events.pug', {
    events: req.user.events,
    signedIn: req.user ? true : false
  })
})
router.post('/events', (req,res) => {
  const {date, title, description, city} = req.body
  if(req.user.email) {
    User.addEvent(req.user.email,{date,title,description,city})
    return res.redirect('/events')
  }
  return res.send('failed')

})
module.exports = router
