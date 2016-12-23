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
  if (!isDate(date)) {
    const formData = {
      date,
      title,
      description,
      city
    }
    return res.render('events.pug', {
      error: 'Invalid date',
      events: req.user.events,
      signedIn: req.user ? true : false,
      formData
    })
  }
  if(req.user.email) {
    const newEvent = {date,title,description,city}
    const events = req.user.events.concat([newEvent])

    User.addEvent(req.user.email, newEvent)

    return res.render('events.pug',  {
      events,
      signedIn: req.user ? true : false
    })
  } else{
    return res.send('failed')
  }
})
router.delete('/events', (req,res) => {
  const { id, time } = req.body
  const { email } = req.user
  // console.log('iddd', id);
  // console.log('event id', req.user.events[req.user.events.length-1].id);
  // console.log('old eventss', req.user.events);

  if (email) {
    // const events = req.user.events.filter((event) => {
    //   return (event.id != id)
    // })
    // console.log('new eventsss', events);

    User.deleteEvent(email, id, time).then((response) => {
      console.log('RESPONSEE', response)
      const events = response.events
      console.log('response events', events);
      return res.render('events.pug',  {
        events,
        error:'reloaded',
        signedIn: req.user ? true : false
      })
    })

  } else{
    return res.send('failed')
  }
})
function isDate(date) {
  return !isNaN(Date.parse(date))
}
module.exports = router
