const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const validator = require('express-validator')
const path = require('path')
const passport = require('passport')

const { database } = require('./keys')

const tanks = require('./routes/tanks')
const signup = require('./routes/signup')
const login = require('./routes/login')
const dashboard = require('./routes/dashboard')

const app = express()

app.use('/build',express.static(path.join(__dirname,'..','/build')))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'/views'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(validator())

app.use(passport.initialize())

app.use('/', tanks)
app.use('/', signup)
app.use('/', login)
app.use('/', dashboard)

mongoose.connect(process.env.MONGODB_URI || require('./keys').database)

app.listen(process.env.PORT || 3000, () => {
  console.log('***************Listening on port 3000***************');
})
