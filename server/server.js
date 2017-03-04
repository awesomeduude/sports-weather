const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const path = require('path')
const passport = require('passport')
const session = require('express-session')

const signup = require('./routes/signup')
const login = require('./routes/login')
const dashboard = require('./routes/dashboard')
const events = require('./routes/events')
const signout = require('./routes/signout')
const weather = require('./routes/weather')
const api = require('./routes/api')

const User = require('./models/user')

const app = express()

app.use(express.static(path.join(__dirname,'..','/build')))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'/views'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(expressValidator({
  customValidators: {
    isValidPhoneNumber: function(number) {
      const regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
      return regex.test(number)
    }
  }
}))
var sess = {
  secret: 'keyboard cat',
  cookie: {}
}
//if app is deployed
if (process.env.MONGODB_URI) {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

app.use(passport.initialize())
app.use(passport.session())

// app.use('/', signup)
// app.use('/', login)
// app.use('/', dashboard)
// app.use('/', events)
// app.use('/', signout)
//app.use('/', weather)
app.use('/api', api)

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,'..','/build', 'index.html'))
})


//const database = 'mongodb://127.0.0.1/myDb'
const database = process.env.MONGODB_URI || require('./keys').database
mongoose.connect(database)

app.listen(process.env.PORT || 3000, () => {
  console.log('***************Listening on port 3000***************');
})
