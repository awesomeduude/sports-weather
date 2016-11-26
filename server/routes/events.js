const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/events', (req,res) => {
  if (req.user) {
    res.render('events.pug', {
      events: req.user.events,
      signedIn: req.user ? true : false
    })
  } else {
    res.redirect('/login')
  }
})

router.post('/events', (req,res) => {
  const { date, title, description, city } = req.body
  if(req.user.email) {
    User.addEvent(req.user.email,{date,title,description,city})
    setTimeout(() => {

      return res.redirect('/events')
    }, 100)

  } else{
    return res.send('failed')
  }
})
router.delete('/events', (req,res) => {
  const { id, time } = req.body
  const { email } = req.user

  console.log('delete received', id, time, email);
  if (email){
    const events = User.deleteEvent(email, id, time)

    setTimeout(() => {
      console.log('BEFORREE METHOODD', req.method);
      req.method = 'GET'
      console.log('aFTERRR METHOODD', req.method);
      res.send({redirect:'/events'})
    }, 100)

  } else{
    return res.send('failed')
  }

})
module.exports = router
