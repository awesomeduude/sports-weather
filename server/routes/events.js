const express = require('express')
const axios = require('axios')

const router = express.Router()
const User = require('../models/user')
const Event = require('../models/event')


const weatherKey = process.env.WEATHER_KEY

router.get('/events', (req,res) => {
  // return res.render('events.pug', {
  //   signedIn: req.user ? true: false,
  //   events: req.user.events,
  //   edit: true
  // })
  if (req.user) {
    const { events } = req.user

      res.render('events.pug', {
        signedIn: req.user ? true : false,
        events
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
  const { id } = req.body
  console.log('from router',id)
  const { email } = req.user

  if (email) {
    req.method = 'GET'

    User.deleteEvent(email, id, () => {

    })
    Event.deleteEvent(id, () => {

    })

  } else{
    return res.send('failed')
  }
})
router.put('/events', (req,res) => {
  console.log('putttt');
  const eventData = req.body.data.eventData
  const { date, title, description, city, state, id } = eventData
  const { events, email } = req.user

  const formData = {date,title,description,city, state}
  console.log('daateee', date);
  //check if valid date, and valid city
  if (!isDate(date)) {
    console.log('D@@@t3333 ERROr');
    return res.status(200).render('events.pug', {
      error: 'Invalid date',
      signedIn: req.user ? true : false,
      events,
      edit: true,
      formData
    })
  }
  //correct format for api call
  const url  = `http://api.wunderground.com/api/${weatherKey}/forecast/q/${state}/${city.replace(' ', '_')}.json`

  axios.get(url).then((response) => {
    //not a valid city
    console.log('axios');
    if (!response.data.forecast) {
      const error = 'The city you entered was not found in the state'

      return res.render('events.pug', {
        signedIn: req.user ? true : false,
        events,
        error,
        edit: true,
        formData
      })
    } else{ //user entered valid city
      if(email) {
        //const newEvent = {id, date,title,description,city, state}
        console.log('newevent$$&&', eventData);
        //edit model
        req.method = 'GET'
        User.editEvent(email, eventData, () => {

          return res.send({redirect:'/dashboard'})
        })
      } else{
        console.log('not logged in');
        return res.redirect('/login')
      }
    }
  })
})
function isDate(date) {
  return !isNaN(Date.parse(date))
}
module.exports = router
