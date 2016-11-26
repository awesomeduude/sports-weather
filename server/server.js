const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const path = require('path')
const passport = require('passport')
const session = require('express-session')

const tanks = require('./routes/tanks')
const signup = require('./routes/signup')
const login = require('./routes/login')
const dashboard = require('./routes/dashboard')
const events = require('./routes/events')
const signout = require('./routes/signout')
const User = require('./models/user')

const app = express()

app.use('/build',express.static(path.join(__dirname,'..','/build')))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'/views'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(expressValidator({
  customValidators: {
    userDoesNotExist: function(email) {

      return User.getUserByEmail(email, (err, user) => {

        if(!user){
          console.log('**************NO USEr')
          return true
        } else{
          console.log('*********>>>>>>>>YES USER')
          return false
        }
      })
    }
  }
}))


var sess = {
  secret: 'keyboard cat',
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', tanks)
app.use('/', signup)
app.use('/', login)
app.use('/', dashboard)
app.use('/', events)
app.use('/', signout)


const { database } = require('./keys')
mongoose.connect(process.env.MONGODB_URI || database)

app.listen(process.env.PORT || 3000, () => {
  console.log('***************Listening on port 3000***************');
})
