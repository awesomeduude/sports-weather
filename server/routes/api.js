const express = require('express')
const axios = require('axios')

const router = express.Router()

const User = require('../models/user')
const weatherKey = process.env.WEATHER_KEY || require('../keys').weather

router.get('/', (req, res) => {
  return res.json({user: req.user})
})
router.post('/events', (req,res) => {

  const { date, title, description, city, state } = req.body.data
  const { events, email } = req.user

  const formData = {date,title,description,city, state}

  //check if valid date, and valid city
  if (!isDate(date)) {
    return res.json({error: 'Invalid Date'})
  }
  //correct format for api call
  const url  = `http://api.wunderground.com/api/${weatherKey}/forecast/q/${state}/${city.replace(' ', '_')}.json`

  axios.get(url).then((response) => {

    if (!response.data.forecast) { //not a valid city
      const error = 'The city you entered was not found in the state'
      return res.json({error})
    } else{ //user entered valid city
      if(email) {
        const newEvent = {date,title,description,city, state}

        User.addEvent(email, newEvent, (response) => {
          return res.json(response)
        })
      } else{
        console.log('not logged in');
        return res.json({error: 'Please login'})
      }
    }
  })

})
function isDate(date) {
  return !isNaN(Date.parse(date))
}
module.exports = router
