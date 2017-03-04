const express = require('express')
const axios = require('axios')

let { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN} = process.env

TWILIO_ACCOUNT_SID = TWILIO_ACCOUNT_SID.replace(/['"]+/g, '')
TWILIO_AUTH_TOKEN = TWILIO_AUTH_TOKEN.replace(/['"]+/g, '')
TWILIO_NUMBER = '+16502002228'

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
router.post('/weather', (req, res) => {
  const { date } = req.body
  sendAllTexts(date, (response) => {
    return res.json(response)
  })
})

function sendText(phoneNumber, message, callback) {

  twilio.sendMessage({
    to: phoneNumber,
    from: TWILIO_NUMBER,
    body: message
  }, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      callback()
    }

  })


}
//module.exports = router

module.exports.sendAllTexts = function sendAllTexts(date, callback) {


  Event.getAllEvents(date, (events) => {

    events.forEach((event, i, arr) => {
      const { city, state, email, title, date, id } = event
      User.findUserByEmail(email).then((user) => {
        const { phone } = user

        const url  = `http://api.wunderground.com/api/${weatherKey}/forecast/q/${state}/${city.replace(' ', '_')}.json`

        axios.get(url).then((response) => {

          //CHANGE THE DATE WHICH WEATHER IS GOTTEN FROM(change forecastday)
          const weather = response.data.forecast.simpleforecast.forecastday[1].conditions

          const message = `The weather will be ${weather} at your event ${title} on ${date}`

          sendText(phone, message, () => {

            // User.deleteEvent(email, id,() => {
            //   //empty
            // })
            //
            // Event.deleteEvent(email, date, id)
            if (arr.length-1 === i){
              callback()
            } //change this to after the event is deleted

          })


        })

      })
    })

  })
 return {success: true}

}