const express = require('express')
const axios = require('axios')

const router = express.Router()
const User = require('../models/user')
const Event = require('../models/event')


const weatherKey = process.env.WEATHER_KEY || require('../keys').weather

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

  const { date, title, description, city, state } = req.body
  const { events, email } = req.user

  const formData = {date,title,description,city, state}

  //check if valid date, and valid city
  if (!isDate(date)) {
    return res.render('events.pug', {
      error: 'Invalid date',
      signedIn: req.user ? true : false,
      events,
      formData
    })
  }
  //correct format for api call
  const url  = `http://api.wunderground.com/api/${weatherKey}/forecast/q/${state}/${city.replace(' ', '_')}.json`

  axios.get(url).then((response) => {
    //not a valid city
    if (!response.data.forecast) {
      const error = 'The city you entered was not found in the state'

      return res.render('events.pug', {
        signedIn: req.user ? true : false,
        events,
        error,
        formData
      })
    } else{ //user entered valid city
      if(email) {
        const newEvent = {date,title,description,city, state}

        User.addEvent(email, newEvent, () => {
          return res.redirect('/events')
        })
      } else{
        console.log('not logged in');
        return res.redirect('/login')
      }
    }
  })

})
router.delete('/events', (req,res) => {
  const { id, time } = req.body
  const { email } = req.user

  if (email) {
    req.method = 'GET'

    User.deleteEvent(email, id, () => {
        return res.send({redirect:'/dashboard'})
    })
    Event.deleteEvent(email, time, id)

  } else{
    return res.send('failed')
  }
})

function isDate(date) {
  return !isNaN(Date.parse(date))
}
module.exports = router
