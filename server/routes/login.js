const express = require('express')
const User = require('../models/user')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')

const router = express.Router()


router.get('/login', (req,res) => {
  res.render('login.pug', {
    signedIn: req.user ? true : false
  })
})

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {

  User.getUserByEmail(email, (err, user) => {
    if (err) throw err
    if (!user) {

      return done(null, false, {error: "Unknown User"})
  }
  User.comparePassword(password, user.password , (err, isMatch) => {
      if(err) throw err
      if(isMatch) {
        return done(null, user)
      }

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
router.post('/login', function(req, res, next) {

  passport.authenticate('local', {session:true},function(err, user, info) {

    if (!user){
      return res.render('login.pug', {error:info.error})
    } else{
      req.logIn(user, (err) => {
        global.signedIn = true
        return res.redirect('/dashboard')
      })
    }

  })(req, res, next)
})

module.exports = router
