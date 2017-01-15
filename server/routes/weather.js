const express = require('express')
const axios = require('axios')

let { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN} = process.env

TWILIO_ACCOUNT_SID = TWILIO_ACCOUNT_SID.replace(/['"]+/g, '')
TWILIO_AUTH_TOKEN = TWILIO_AUTH_TOKEN.replace(/['"]+/g, '')
TWILIO_NUMBER = '+16502002228'
console.log('twill',TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

const router = express.Router()

const weatherKey = process.env.WEATHER_KEY || require('../keys').weather

const Event = require('../models/event')
const User = require('../models/user')
//TEST
router.put('/weather', (req,res) => {
  const { number } = req.body
  twilio.sendMessage({
    to: number,
    from: TWILIO_NUMBER,
    body: 'hey Paul, you are required to give Calvin the hotspot'
  }, (err, response) => {
    if (err) {
      return res.send({err})
    } else {
      return res.send({'success': true})
    }
  })

})
router.post('/weather', (req,res) => {
  console.log('posteddd');
  const { date } = req.body
  console.log('received date: ', date);
  Event.getAllEvents(date, (events) => {
    console.log('evennntsss', events);
    events.forEach((event) => {
      const { city, email, title, date } = event
      User.findUserByEmail(email).then((user) => {
        const { phone } = user

        const url  = `http://api.wunderground.com/api/${weatherKey}/forecast/q/CA/${city.replace(' ', '_')}.json`

        axios.get(url).then((response) => {

          //CHANGE THE DATE WHICH WEATHER IS GOTTEN FROM(change forecastday)
          const weather = response.data.forecast.simpleforecast.forecastday[1].conditions

          const message = `The weather will be ${weather} at your event ${title} on ${date}`
          console.log('phoNNE, message', phone, message);
          sendText(phone, message)
        })

      })
    })

  })
  return res.send({'sucesss': true})
})
function sendText(phoneNumber, message) {

  twilio.sendMessage({
    to: phoneNumber,
    from: TWILIO_NUMBER,
    body: message
  }, (err, response) => {
    if (err) {
      console.log(err);
    }
    console.log('twilio response', response);
  })
  console.log('messsage', message);

}
module.exports = router
