const express = require('express')
const User = require('../models/user')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')

const router = express.Router()

router.get('/login', (req,res) => {
  res.render('login.pug')
})

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {

  User.getUserByEmail(email, (err, user) => {
    if (err) throw error
    if (!user) {
      console.log('Unknown user')
      return done(null, false, {error: "Unknown User"})
  }
  User.comparePassword(password, user.password , (err, isMatch) => {
      if(err) throw error
      if(isMatch) {
        return done(null, user)
      }
      console.log('invalid password')
      return done(null, false, {error: "Invalid Password"})

    })
  })
}))
passport.serializeUser((user, done)=> {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user)
  })
})
router.post('/login',
  passport.authenticate('local', {successRedirect: '/dashboard', failureRedirect: '/login'}),
  (req,res) => {
    console.log('asdf')
    res.redirect('/dashboard')
  }
)
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.render('login.pug', {error: err})
    }
    // Redirect if it fails
    if (!user) {
      return res.render('/login', {error:err})
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err)
      }
      // Redirect if it succeeds
      return res.redirect('/dashboard')
    })
  })(req, res, next)
})

module.exports = router
