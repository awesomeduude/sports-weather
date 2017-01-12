const express = require('express')
const axios = require('axios')

const router = express.Router()

const weatherKey = process.env.WEATHER_KEY || require('../keys').weather

const Event = require('../models/event')
const User = require('../models/user')

router.post('/weather', (req,res) => {

  Event.getAllEvents('01/11/2017', (events) => {

    events.forEach((event) => {
      const { city, email, title, date } = event
      User.findUserByEmail(email).then((user) => {
        const { phone } = user

        const url  = `http://api.wunderground.com/api/${weatherKey}/forecast/q/CA/${city.replace(' ', '_')}.json`
        console.log('urll', url);
        axios.get(url).then((response) => {

          //CHANGE THE DATE WHICH WEATHER IS GOTTEN FROM(change forecastday)
          const weather = response.data.forecast.simpleforecast.forecastday[0].conditions

          const message = `The weather will be ${weather} at your event ${title} on ${date}`
          sendText(phone, message)
        })

      })
    })
    console.log('calback was called');
  })
  return res.send({'sucesss': true})
})
function sendText(phoneNumber, message) {
  console.log('messsage', message);

}
module.exports = router
