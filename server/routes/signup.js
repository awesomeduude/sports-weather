const express = require('express')
const User = require('../models/user')


const router = express.Router()


router.get('/signup', (req,res) => {
  res.render('signup.pug')
})
router.post('/signup', (req,res) => {
  const { name, email, password, cpassword } = req.body
  console.log(name + ' ' + password)


  req.checkBody('name', 'Name is Required').notEmpty()
  req.checkBody('email', 'Email is Required').notEmpty()
  req.checkBody('email', 'Email is not valid').isEmail()
  req.checkBody('password', 'Password is Required').notEmpty()
  req.checkBody('cpassword', 'Passwords do not match').equals(password)

  const errors = req.validationErrors()

  if (errors) {
    res.render('signup.pug',{errors,name,email})
  } else {
      const newUser = new User({name, email, password})

      User.createUser(newUser, (err, user) => {
        if(err) throw error;
      })

      res.redirect('/login')
  }
})

module.exports = router
