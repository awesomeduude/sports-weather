const express = require('express')
const passport = require('passport')

const User = require('../models/user')


const router = express.Router()

router.get('/', (req,res) => {
  res.redirect('/signup')
})

router.get('/signup', (req,res) => {
  res.render('signup.pug')
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

    return res.render('signup.pug',{errors,name,email,phone})
  } else {
      const newUser = new User({name, email, phone, password})

      User.register(newUser, password, (err, user) => {

        if (err) {
          const errors = [{'msg': err.message}]
          return res.render('signup.pug', {errors});
        }
        return res.redirect('/login')
   });
  }
})


module.exports = router
