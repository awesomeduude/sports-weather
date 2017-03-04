const express = require('express')
const axios = require('axios')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')

const router = express.Router()

const User = require('../models/user')
const Event = require('../models/event')
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
router.delete('/events', (req,res) => {
  const { id } = req.body
  const { email } = req.user

  if (email) {

    User.deleteEvent(email, id, (user) => {
        return res.json(user)
    })
    Event.deleteEvent(id)

  } else{
    return res.json({error: 'Please login'})
  }
})
router.put('/events', (req,res) => {
  const eventData = req.body.data
  const { date, title, description, city, state, id } = eventData
  const { events, email } = req.user

  const formData = {date,title,description,city, state}

  //check if valid date, and valid city
  if (!isDate(date)) {
    return res.json({error: 'Invalid Date'})
  }
  //correct format for api call
  const url  = `http://api.wunderground.com/api/${weatherKey}/forecast/q/${state}/${city.replace(' ', '_')}.json`

  axios.get(url).then((response) => {
    //not a valid city

    if (!response.data.forecast) {
      const error = 'The city you entered was not found in the state'
      return res.json({error})
    } else{ //user entered valid city
      if(email) {
        User.editEvent(email, eventData, (user) => {

          return res.json(user)
        })
      } else{
        console.log('not logged in');
        return res.json({error: 'Please login'})
      }
    }
  })
})
passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.post('/login',  (req, res, next) => {

  const { email, password } = req.body
  console.log('posted&&&&&&&', email, password);
  req.checkBody('email', 'Please enter your email').notEmpty()
  req.checkBody('password', 'Please enter your password').notEmpty()

  const errors = req.validationErrors()

  if (errors) {
    const error = errors[0].msg
    return res.json({error})
  }

  passport.authenticate('local', {session:true}, (err, user, info) => {

    if (!user){
      const error = info.message

      return res.json({error})
    } else {
      req.logIn(user, (err) => {

        return res.json({user})
      })
    }

  })(req, res, next)
})
router.get('/logout', (req,res) => {
  req.logout()
  return res.json({sucess:true})
})
router.post('/signup', (req,res) => {
  const { name, email, phone, password, cpassword } = req.body

  req.checkBody('name', 'Name is Required').notEmpty()

  req.checkBody('email', 'Email is Required').notEmpty()
  req.checkBody('email', 'Email is not valid').isEmail()

  req.checkBody('phone', 'Phone number is required').notEmpty()
  req.checkBody('phone', 'Phone number is in incorrect format').isValidPhoneNumber()

  req.checkBody('password', 'Password is Required').notEmpty()
  req.checkBody('cpassword', 'Passwords do not match').equals(password)

  const errors = req.validationErrors()

  if (errors) {
    const error = errors[0].msg
    return res.json({error})
  } else {
    const newUser = new User({name, email, phone, password})

    User.register(newUser, password, (err, user) => {

      if (err) {

        const error = err.message
        return res.json({error})

      } else {
        return res.json({success:true})
      }
    });
  }
})
function isDate(date) {
  return !isNaN(Date.parse(date))
}
module.exports = router
